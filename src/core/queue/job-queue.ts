import Queue, { JobOptions } from 'bull';
import { queues } from '@core/queue/manager';
import { IJobData } from '@core/contract';
import { QUEUE } from '@constant/queue';

export abstract class JobQueue<T = any> {
    protected tries: number;
    protected queue: string;
    protected path: string;
    protected timeout: number;
    protected removeOnCompleted: boolean;
    private jobData: T;
    abstract handle(): Promise<void>;

    public setJobData(data: T): this {
        this.jobData = data;
        return this;
    }
    public getJobData(): T {
        return this.jobData;
    }
    public dispatch(): void {
        const queue: Queue.Queue = queues[this.queue ?? QUEUE.DEFAULT];
        const jobPath = this.path
            ? `${this.path}/${this.constructor.name}`
            : this.constructor.name;
        const jobData: IJobData<T> = {
            job_path: jobPath,
            data: this.jobData,
        };
        const option: JobOptions = {
            attempts: this.tries ?? 1,
            timeout: this.timeout ?? 0,
            removeOnComplete: this.removeOnCompleted ?? true,
        };
        if (_.get(this.jobData, 'delay')) {
            option.delay = _.get(this.jobData, 'delay');
        }
        queue.add(jobData, option);
        return;
    }
}
