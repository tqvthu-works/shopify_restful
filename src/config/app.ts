import { config } from 'dotenv';
config();
export const appConfig = {
    env: process.env.APP_ENV,
    lang: ['en'],
    providers: ['AppServiceProvider'],
    host: process.env.HOST,
    webhook_host: process.env.WEBHOOKS_HOST,
};
