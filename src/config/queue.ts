import { REDIS } from '@constant/redis';
export const queueConfig = {
    /* [queue_name]: {connection_name} */
    webhook: REDIS.CONNECTION_DEFAULT,
};
