import { config } from 'dotenv';
import { appConfig } from './app';
config();
const shopifyConfig = {
    api_key: process.env.SHOPIFY_API_KEY,
    api_secret: process.env.SHOPIFY_API_SECRET,
    app_slug: process.env.SHOPIFY_APP_SLUG,
    app_id: process.env.SHOPIFY_APP_ID,
    api_version: process.env.SHOPIFY_API_VERSION,
    api_host: process.env.HOST,
    scopes: ['read_products', 'read_orders'],
    webhooks: [
        {
            address: `${appConfig.webhook_host}/api/webhook/uninstall`,
            topic: 'app/uninstalled',
        },
        {
            address: `${appConfig.webhook_host}/api/webhook/shop/update`,
            topic: 'shop/update',
        },
    ],
};
export { shopifyConfig };
