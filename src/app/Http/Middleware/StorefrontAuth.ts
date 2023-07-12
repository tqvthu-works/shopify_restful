import { Shop } from '@app/Models/Shop';
import { HTTP_STATUS_CODE } from '@constant/common';
import { NextFunction, Request, Response } from 'express';

export const StorefrontAuth = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        if (!_.get(req.query, 'shopify_domain')) {
            return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
                status: false
            });
        }
        const shop = await Shop.findOne({
            where: { shopify_domain: req.query.shopify_domain as string }
        });
        if (!shop) {
            return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
                status: false
            });
        }
        req.query = {
            shop_id: shop.dataValues.id as any,
            shopify_domain: shop.dataValues.shopify_domain,
            access_token: shop.dataValues.access_token
        };
        return next();
    } catch (err) {
        return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
            status: false
        });
    }
};
