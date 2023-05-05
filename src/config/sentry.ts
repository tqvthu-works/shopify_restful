import { config } from 'dotenv';
config();

export const sentryConfig = {
    DNS: process.env.SENTRY_DSN,
};
