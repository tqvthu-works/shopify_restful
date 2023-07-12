import Express from 'express';
import AuthRouter from '@routes/api/auth';
import ShopRouter from '@routes/api/shop';
import WebhookRouter from '@routes/api/webhook';
import StorefrontRouter from './api/storefront';

const ApiRouter = Express.Router();

ApiRouter.use(AuthRouter);
ApiRouter.use('/shops', ShopRouter);
ApiRouter.use('/webhooks', WebhookRouter);

ApiRouter.use('/storefront', StorefrontRouter);

export { ApiRouter };
