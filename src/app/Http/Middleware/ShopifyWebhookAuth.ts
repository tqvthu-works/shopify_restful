import { NextFunction, Request, Response } from 'express';
import { shopifyConfig } from '@config/shopify';
import * as httpStatus from 'http-status';
import crypto from 'crypto';
import i18next from 'i18next';
export const ShopifyWebhookAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const hmacHeader: string | undefined = req.header('X-Shopify-Hmac-Sha256');
        const rawBody = req.raw_body;
        const hmacCalculated: string = crypto
            .createHmac('sha256', shopifyConfig.api_secret)
            .update(rawBody)
            .digest('base64');
        if (hmacHeader !== hmacCalculated) {
            return res.status(401).send(i18next.t('custom.shopify.webhook_failed'));
        }

        return next();
    } catch (err) {
        console.log(err);
        return res.status(httpStatus.UNAUTHORIZED).json({
            status: false
        });
    }
};
