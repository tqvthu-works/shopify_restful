import Queue, { JobOptions } from 'bull';
import { queues } from '@core/queue/manager';
import { IJobData } from '@core/contract';
import { QUEUE } from '@constant/queue';
import moment from 'moment';

export abstract class JobQueue<P = any> {
    protected tries: number;
    protected queue: string;
    protected path: string;
    protected timeout: number;
    protected removeOnCompleted: boolean;
    protected removeOnFail: boolean;
    private delayDateTime: moment.Moment;

    private payload: P;
    abstract handle(): Promise<void>;

    public setPayload(payload: P): this {
        this.payload = payload;
        return this;
    }
    public getPayload(): P {
        return this.payload;
    }
    public delay(delay: moment.Moment): this {
        this.delayDateTime = delay;
        return this;
    }
    public dispatch(): void {
        const queue: Queue.Queue = queues[this.queue ?? QUEUE.DEFAULT];
        const jobHandlerPath = this.path
            ? `${this.path}/${this.constructor.name}`
            : this.constructor.name;
        const jobData: IJobData<P> = {
            job_path: jobHandlerPath,
            data: this.payload
        };
        const option: JobOptions = {
            attempts: this.tries ?? 1,
            timeout: this.timeout ?? 0,
            removeOnComplete: this.removeOnCompleted ?? true,
            removeOnFail: this.removeOnFail ?? false
        };
        if (this.delayDateTime) {
            option.delay = this.delayDateTime.valueOf() - moment().valueOf();
        }
        queue.add(jobData, option);
        return;
    }
}
