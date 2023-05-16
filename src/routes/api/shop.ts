import Express from 'express';
import { ShopifyAuth } from '@app/Http/Middleware/ShopifyAuth';
import { ShopRequest } from '@app/Http/Request/ShopRequest';
import ShopController from '@app/Http/Controllers/ShopController';
const ShopRouter = Express.Router();

/**
 * Set groups
 * Set Request Validator Middleware
 * Set middleware
 */
ShopRouter.use(
    '/shops',
    ShopifyAuth,
    (req, res, next) => {
        new ShopRequest(req, res, next).handle();
    },
    ShopRouter,
); /* shops prefix */

/* Place to define routes */
ShopRouter.get('/detail', ActionHandler(ShopController, 'detail'));

export default ShopRouter;
