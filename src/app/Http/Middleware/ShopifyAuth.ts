import { NextFunction, Request, Response, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { parse as parseUrl } from 'url';
import { Shop } from '@app/Models/Shop';
import { shopifyConfig } from '@config/shopify';
import { AnyObject } from '@core/contract';
import * as httpStatus from 'http-status';

export const ShopifyAuth = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const token = req.headers.authorization?.replace('Bearer ', '') || '';
    try {
        if (_.get(req, 'query.is_testing')) {
            const shop = await Shop.findOne({
                where: {
                    shopify_domain: _.get(req, 'query.shopify_domain', ''),
                },
            });
            if (!shop || shop && !_.get(shop, 'dataValues.is_test')) {
                return res.status(httpStatus.UNAUTHORIZED).json({
                    status: false,
                });
            }
            req.query = {
                shop_id: shop.dataValues.id as any,
                shopify_domain: shop.dataValues.shopify_domain,
                access_token: shop.dataValues.access_token,
            };
            return next();
        }
        const decoded: AnyObject = jwt.verify(token, shopifyConfig.api_secret);
        const shopifyDomain = parseUrl(decoded.dest!).host;
        const shop = await Shop.findOne({
            where: {
                shopify_domain: shopifyDomain as string,
            },
        });

        if (!shop) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                status: false,
                message: 'Shopify domain does not exist',
            });
        }

        req.query = {
            shop_id: shop.dataValues.id as any,
            shopify_domain: shop.dataValues.shopify_domain,
            access_token: shop.dataValues.access_token,
        };
        return next();
    } catch (err) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            status: false,
        });
    }
};
