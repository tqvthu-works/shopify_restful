import { APP_ENVS } from '@constant/app';

export const appConfig = {
    env: process.env.APP_ENV ?? APP_ENVS.LOCAL,
    port: process.env.PORT ?? 3000,
    lang: ['en'],
    providers: ['AppServiceProvider'],
    host: process.env.HOST ?? 'http://localhost',
    webhook_host: process.env.WEBHOOKS_HOST ?? 'http://localhost',
};
