import Express from 'express';
import ShopWebhookController from '@app/Http/Controllers/Webhooks/ShopWebhookController';
import { ShopifyWebhookAuth } from '@app/Http/Middleware/ShopifyWebhookAuth';

const WebhookRouter = Express.Router();

WebhookRouter.use(
    '/webhooks',
    ShopifyWebhookAuth,
    WebhookRouter,
); /* webhooks prefix */

/* Where to define routes */
WebhookRouter.post(
    '/shops/update',
    ActionHandler(ShopWebhookController, 'update'),
);

export default WebhookRouter;
