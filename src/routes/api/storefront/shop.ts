import Express from 'express';
import { ShopController } from '@app/Http/Controllers/Storefront/ShopController';
const ShopRouter = Express.Router();

ShopRouter.get('/detail', ActionHandler(ShopController, 'detail'));

export default ShopRouter;
