import Queue from 'bull';
import { redisConfig } from '@config/redis';
import { queueConfig } from '@config/queue';
import { ConsoleLog } from '@app/Helpers/ConsoleLog';
import { REDIS } from '@constant/redis';
/**
 * Init all bull queue config form queueConfig
 */
export class Manager {
    public static readonly queues: { [index: string]: Queue.Queue } = {};
    public static load(): void {
        const queueConns = queueConfig.queue_connection;
        if (!_.get(queueConns, REDIS.QUEUE_DEFAULT)) {
            queueConns[REDIS.QUEUE_DEFAULT] = REDIS.CONNECTION_DEFAULT;
        }
        const queueNames = Object.keys(queueConns);
        for (const queue of queueNames) {
            const connection = queueConns[queue];
            const config = redisConfig[connection] ?? redisConfig[REDIS.CONNECTION_DEFAULT];
            if (!config.host.length) {
                ConsoleLog.debug('Redis configuration is missing. Please check in .env!', false);
                continue;
            }
            const instance = new Queue(queue, `redis://${config.host}`, {
                redis: { db: config.db as any }
            });
            Manager.queues[queue] = instance;
        }
    }
}
export const queues = Manager.queues;
