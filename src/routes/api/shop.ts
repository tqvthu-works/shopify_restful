import Express from 'express';
import { ShopController } from '@app/Http/Controllers/ShopController';
import { handler } from '@core/http/controller-handler';
import { ShopifyAuth } from '@app/Http/Middleware/ShopifyAuth';
import { ShopRequest } from '@app/Http/Request/ShopRequest';

const shopController = container.resolve<ShopController>(ShopController);
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
ShopRouter.get('/detail', handler(shopController, 'detail'));

export default ShopRouter;
