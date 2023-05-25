import Express from 'express';
import AuthRouter from '@routes/api/auth';
import ShopRouter from '@routes/api/shop';
import WebhookRouter from '@routes/api/webhook';

const ApiRouter = Express.Router();

ApiRouter.use(AuthRouter);
ApiRouter.use('/shops', ShopRouter);
ApiRouter.use('/webhooks', WebhookRouter);

export { ApiRouter };
