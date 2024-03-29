import { inject, injectable } from 'inversify';
import { Shop, ShopCreationAttributes } from '../Models/Shop';
import { Request } from 'express';
import { v4 as uuid } from 'uuid';
import { shopifyConfig } from '@config/shopify';
import { BaseService } from './BaseService';
import { apiConfig } from '@config/api';
import querystring from 'querystring';
import crypto from 'crypto';
import axios from 'axios';
import { IAccessToken, IShopApiResponse } from '@contract/shopify/shop';
import { ShopifyApiService } from './ShopifyApiService';
import i18next from 'i18next';
import { STATUS } from '@constant/common';
import { WebhookRegister } from '@app/Jobs/WebhookRegister';

@injectable()
export class AuthService extends BaseService {
    protected shopifyApiService: ShopifyApiService;
    constructor(@inject('ShopifyApiService') shopifyApiService: ShopifyApiService) {
        super();
        this.shopifyApiService = shopifyApiService;
    }

    public async buildInstallUrl(request: Request): Promise<this> {
        try {
            this.setStatus(true);
            this.setMessage(apiConfig.message.success.common);
            const { shop } = request.query;
            const urlStore = `${shop}/admin`;
            const redirectUrl = `${shopifyConfig.api_domain}/api/auth/callback`;
            const apiKey = shopifyConfig.api_key;
            const scopes = shopifyConfig.scopes.join(',');
            const state = uuid();
            const url = `https://${urlStore}/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${redirectUrl}&state=${state}`;
            this.setData({ url: url });
        } catch (error) {
            this.setStatus(false);
            this.setMessage(apiConfig.message.error.common);
            this.setSentryId(this.sentry.captureException(error).toString());
        }
        return this;
    }
    private verifyRequest(request: Request): boolean {
        const queryString = querystring.stringify({
            code: request.query.code as string,
            host: request.query.host as string,
            shop: request.query.shop as string,
            state: request.query.state as string,
            timestamp: request.query.timestamp as string
        });
        const match = request.query.hmac;
        const calculated = crypto.createHmac('sha256', shopifyConfig.api_secret).update(queryString).digest('hex');
        return calculated === match;
    }

    private async getAccessData(code: string, shopifyDomain: string): Promise<IAccessToken> {
        const data = {
            client_id: shopifyConfig.api_key,
            client_secret: shopifyConfig.api_secret,
            code: code
        };
        const response = await axios.post(`https://${shopifyDomain}/admin/oauth/access_token`, data);
        return response.data;
    }
    private async upsertShop(res: IShopApiResponse, accessToken: string, isUpdate?: boolean): Promise<void> {
        const shopData: ShopCreationAttributes = {
            id: res.shop.id,
            shopify_domain: res.shop.myshopify_domain,
            name: res.shop.name,
            domain: res.shop.domain,
            owner: res.shop.shop_owner,
            email: res.shop.email,
            phone: res.shop.phone,
            timezone: res.shop.timezone,
            plan_name: res.shop.plan_name,
            country: res.shop.country,
            status: STATUS.ACTIVATED,
            currency: res.shop.currency,
            access_token: accessToken,
            uninstalled_at: null
        };
        if (isUpdate) {
            await Shop.update(shopData, { where: { id: shopData.id } });
            return;
        }
        await Shop.create(shopData);
        return;
    }
    public async handleAuthCallback(request: Request): Promise<this> {
        this.setStatus(false);
        this.setMessage(apiConfig.message.error.common);
        const verify = this.verifyRequest(request);
        if (!verify) {
            this.setMessage(
                i18next.t('custom.shopify.validate_failed', {
                    attribute: 'hmac'
                })
            );
            return this;
        }

        // get shopify access token
        const accessData = await this.getAccessData(request.query.code as string, request.query.shop as string);
        if (!accessData) {
            this.setMessage(
                i18next.t('custom.shopify.get_failed', {
                    attribute: 'Shop detail'
                })
            );
            return this;
        }
        const accessToken = accessData['access_token'];
        const shopInfo = await Shop.findOne({
            where: {
                shopify_domain: request.query.shop as string
            }
        });

        let installType = Shop.NEW_INSTALL_APP;
        if (shopInfo && _.get(shopInfo, 'dataValues.status') == STATUS.ACTIVATED) {
            this.setStatus(true);
            return this;
        }
        if (shopInfo && _.get(shopInfo, 'dataValues.status') == STATUS.INACTIVATED) {
            installType = Shop.REINSTALL_APP;
        }

        const res = await this.shopifyApiService
            .init(request.query.shop as string, accessToken)
            .get<IShopApiResponse>('shop.json');
        if (!res.status) {
            this.setMessage(
                i18next.t('custom.shopify.get_failed', {
                    attribute: 'Shop detail'
                })
            );
            return this;
        }

        await this.upsertShop(res.data, accessToken, installType == Shop.NEW_INSTALL_APP ? false : true);
        /* Register webhooks */
        new WebhookRegister()
            .setPayload({
                access_token: accessToken,
                shopify_domain: request.query.shop as string
            })
            .dispatch();
        this.setStatus(true);
        this.setMessage('success');
        this.setData(res.data.shop);
        return this;
    }
}
