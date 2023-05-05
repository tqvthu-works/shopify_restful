import { injectable } from 'inversify';
import { Shop } from '../Models/Shop';
import { Request } from 'express';
import { BaseService } from './BaseService';
import { apiConfiguration } from '../../config/api';
import { Identifier } from 'sequelize';

@injectable()
export class ShopService extends BaseService {
    protected shopModel: typeof Shop;
    constructor() {
        super();
        this.shopModel = Shop;
    }

    public async detail(request: Request): Promise<this> {
        this.setStatus(true);
        this.setMessage(apiConfiguration.message.success.common);

        const shop = await Shop.findByPk(request.query.shop_id as Identifier);
        this.setData(shop.dataValues);

        return this;
    }
}
