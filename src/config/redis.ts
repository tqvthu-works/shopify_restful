import { IRedisConfig } from '@contract/redis';
export const redisConfig: IRedisConfig = {
    default: {
        host: process.env.REDIS_HOST_URI,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASS,
        db: process.env.REDIS_DB,
    },
    /* For another connection */
};

export const queues: string[] = ['default'].concat(
    process.env.REDIS_QUEUES.split(','),
    [],
);
