import { injectable } from 'inversify';
import { Request } from 'express';
import { ShopService as AppShopService } from '../ShopService';

@injectable()
export class ShopService extends AppShopService {
    constructor() {
        super();
    }
}
