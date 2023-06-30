import 'dotenv/config';
import { IRedisConfig } from '@contract/redis';
export const redisConfig: IRedisConfig = {
    default: {
        host: process.env.REDIS_HOST_URI ?? 'localhost',
        port: process.env.REDIS_PORT ?? '6379',
        password: process.env.REDIS_PASS,
        db: process.env.REDIS_DB ?? 0
    }
    /* For another connection */
};
