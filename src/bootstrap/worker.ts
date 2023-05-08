import 'reflect-metadata';
import Queue, { Job } from 'bull';
import { redisConfig } from '@config/redis';
import { REDIS } from '@constant/redis';
import { ConsoleLog } from '@app/Helpers/ConsoleLog';
import { IJobData } from '@core/contract';
import './boot';

export class Worker {
    private queue: string;
    private connection: string;
    constructor(queue?: string, connection?: string) {
        this.queue = queue ?? REDIS.QUEUE_DEFAULT;
        this.connection = connection ?? REDIS.CONNECTION_DEFAULT;
    }
    public serve(): void {
        ConsoleLog.info(
            `Processing jobs from the [${this.queue}] queue`,
            false,
        );
        const connections: string[] = Object.values(REDIS);
        if (!connections.includes(this.connection)) {
            ConsoleLog.debug(
                `No connection with name ${this.connection} found!` +
                    `. Therefore, the worker is using [${REDIS.CONNECTION_DEFAULT}] connection`,
                false,
            );
            ConsoleLog.debug(
                `Please check your config in @config/redis/queue.ts`,
                false,
            );
            this.connection = REDIS.CONNECTION_DEFAULT;
        }
        const config = redisConfig[this.connection];
        const queue: Queue.Queue = new Queue(
            this.queue,
            `redis://${config.host}`,
            {
                redis: { db: config.db as any },
            },
        );
        queue.process(async (job: Job<IJobData>): Promise<any> => {
            try {
                const data = job.data;
                const start = Date.now();
                ConsoleLog.info(
                    `app/Jobs/${data.job_path}...........................RUNNING`,
                );

                const module = require(`@app/Jobs/${data.job_path}`);
                const jobHandler = module[data.job_path];
                const instance = new jobHandler();
                instance.setPayload(data.data);
                await instance.handle();
                const end = Date.now();
                ConsoleLog.info(
                    `app/Jobs/${data.job_path}..........................${
                        end - start
                    }ms DONE`,
                );
            } catch (error) {
                ConsoleLog.error(error);
            }
        });
    }
}
