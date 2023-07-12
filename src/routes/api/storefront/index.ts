import Express from 'express';
import { StorefrontAuth } from '@app/Http/Middleware/StorefrontAuth';
import ShopRouter from '@routes/api/storefront/shop';

const StorefrontRouter = Express.Router();
StorefrontRouter.use(StorefrontAuth);

/* Place to define routes */
StorefrontRouter.use('/shops', ShopRouter);

export default StorefrontRouter;
