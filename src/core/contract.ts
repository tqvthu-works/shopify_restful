/* Any Object */
export interface AnyObject {
    [key: string]: any;
}

export interface IResult<D = any> {
    status: boolean;
    data: D;
}

/* For Queue */
export interface IJobData<T = AnyObject> {
    job_path: string;
    data: T;
}

import { Command } from 'commander';
export interface ICommand {
    handle(program: Command): Promise<any>;
}

export interface ServiceProvider {
    register(): void;
    boot(): Promise<void>;
}
