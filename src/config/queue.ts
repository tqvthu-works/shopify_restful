import { REDIS } from '@constant/redis';
import { redisConfig } from './redis';
interface IQueueConfig {
    queues: string[];
    connections: string[];
    queue_connection: {
        [index: string]: string;
    };
}
/**
 * This configuration used to initialize the Bull queues, used for workers.
 * queues: list availables queue are able to use for worker
 * queue_connection: show mapping between queue and connection. If a queue is not is this config, then it
 * will use connection default
 */
export const queueConfig: IQueueConfig = {
    queues: ['default'].concat(
        process.env.REDIS_QUEUES?.split(','),
        []
    ) /* list availables queue for app */,
    connections: Object.keys(redisConfig),
    queue_connection: {
        /* queue - connection mapping */
        /* [queue_name]: {connection_name} */
        webhook: REDIS.CONNECTION_DEFAULT /* queue called webhook, will use connection default */
    }
};
