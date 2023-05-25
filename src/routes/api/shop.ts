import Express from 'express';
import { ShopifyAuth } from '@app/Http/Middleware/ShopifyAuth';
import { ShopRequest } from '@app/Http/Request/ShopRequest';
import ShopController from '@app/Http/Controllers/ShopController';
const ShopRouter = Express.Router();

ShopRouter.use(ShopifyAuth, (req, res, next) => {
    new ShopRequest(req, res, next).handle();
});

/* Place to define routes */
ShopRouter.get('/detail', ActionHandler(ShopController, 'detail'));

export default ShopRouter;
