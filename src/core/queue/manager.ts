import Queue from 'bull';
import { redisConfig } from '@config/redis';
import { queueConfig } from '@config/queue';
/**
 * Init all bull queue config form queueConfig
 */
export class Manager {
    public static readonly queues: { [index: string]: Queue.Queue } = {};
    public static load(): void {
        const queueNames = Object.keys(queueConfig);
        for (const queue of queueNames) {
            const connection = queueConfig[queue];
            const config = redisConfig[connection];
            const instance = new Queue(queue, `redis://${config.host}`, {
                redis: { db: config.db as any },
            });
            Manager.queues[queue] = instance;
        }
    }
}
export const queues = Manager.queues;
