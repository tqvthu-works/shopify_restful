import { injectable } from 'inversify';
import axios, { AxiosInstance } from 'axios';
import * as Sentry from '@sentry/node';
import { shopifyConfig } from '@config/shopify';
import { IResult, AnyObject } from '@core/contract';
import { ConsoleLog } from '@app/Helpers/ConsoleLog';

@injectable()
export class ShopifyApiService {
    private sentry: typeof Sentry;
    private baseUrl: string;
    private request: AxiosInstance;

    constructor() {
        this.sentry = Sentry;
    }

    public init(
        shopifyDomain: string,
        accessToken: string,
        headers?: AnyObject,
    ): ShopifyApiService {
        this.baseUrl = `https://${shopifyDomain}/admin/api/${shopifyConfig.api_version}`;
        if (!headers) {
            headers = {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': accessToken,
            };
        }
        this.request = axios.create({
            baseURL: this.baseUrl,
            headers: headers,
        });
        this.request.interceptors.response.use(
            (response) => response,
            (error) => {
                // whatever you want to do with the error
                throw error;
            },
        );
        return this;
    }

    public async get<R = any>(
        uri: string,
        params?: AnyObject,
    ): Promise<IResult<R>> {
        try {
            ConsoleLog.info(`[GET] ${this.baseUrl}/${uri}`);
            const response = await this.request.get(`/${uri}`, { params });
            return {
                status: true,
                data: response.data as R,
            };
        } catch (e) {
            this.sentry.captureException(e);
            return {
                status: false,
                data: null,
            };
        }
    }

    public async post<R = any>(
        uri: string,
        payload: AnyObject,
    ): Promise<IResult<R>> {
        try {
            ConsoleLog.info(
                `[POST] ${this.baseUrl}/${uri} /n payload ${JSON.stringify(
                    payload,
                )}`,
            );
            const response = await this.request.post(`/${uri}`, payload);
            return {
                status: true,
                data: response.data as R,
            };
        } catch (e) {
            this.sentry.captureException(e);
            return null;
        }
    }

    public async put<R = any>(
        uri: string,
        payload: AnyObject,
    ): Promise<IResult<R>> {
        try {
            ConsoleLog.info(
                `[PUT] ${this.baseUrl}/${uri} /n payload ${JSON.stringify(
                    payload,
                )}`,
            );
            const response = await this.request.put(`/${uri}`, payload);
            return {
                status: true,
                data: response.data as R,
            };
        } catch (e) {
            this.sentry.captureException(e);
            return {
                status: false,
                data: null,
            };
        }
    }

    public async delete<R = any>(uri: string): Promise<IResult<R>> {
        try {
            ConsoleLog.info(`[POST] ${this.baseUrl}/${uri}`);
            const response = await this.request.delete(`/${uri}`);
            return {
                status: true,
                data: response.data as R,
            };
        } catch (e) {
            this.sentry.captureException(e);
            return {
                status: false,
                data: null,
            };
        }
    }
}
