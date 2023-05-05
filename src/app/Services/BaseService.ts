import { default as httpStatus } from 'http-status';
import * as Sentry from '@sentry/node';
import { injectable } from 'inversify';

@injectable()
export class BaseService {
    private status?: boolean;
    private httpCode?: (typeof httpStatus)[keyof typeof httpStatus];
    private message?: string;
    private data?: any;
    private sentryId?: string;
    private errors?: any;
    public sentry: typeof Sentry;

    constructor() {
        this.sentry = Sentry;
    }
    /**
     * Set status
     *
     * @param {boolean} [status=true]
     * @return {BaseService}
     */
    public setStatus(status = true): BaseService {
        this.httpCode = httpStatus.OK;
        this.status = status;
        return this;
    }

    /**
     * Retrieve current status
     *
     * @return {boolean | undefined}
     */
    public getStatus(): boolean | undefined {
        return this.status;
    }

    /**
     * Set status code
     *
     * @param {number} httpCode
     * @return {BaseService}
     */
    public setHttpCode(httpCode: number): BaseService {
        this.httpCode = httpCode;
        return this;
    }

    public getHttpCode(): (typeof httpStatus)[keyof typeof httpStatus] {
        return this.httpCode;
    }

    /**
     * Set message
     *
     * @param {string} [message='']
     * @return {BaseService}
     */
    public setMessage(message = ''): BaseService {
        this.message = message;
        return this;
    }

    /**
     * Set data
     *
     * @param {any} data
     * @return {BaseService}
     */
    public setData(data: any): BaseService {
        this.data = data;
        return this;
    }

    /**
     * Get Data
     *
     * @return {IData}
     */
    public getData<IData = any>(): IData | undefined {
        return this.data;
    }

    /**
     * Set Sentry ID
     *
     * @param {string} sentryId
     * @return {BaseService}
     */
    public setSentryId(sentryId: string): BaseService {
        this.sentryId = sentryId;
        return this;
    }

    /**
     * Retrieve default value of Sentry ID
     *
     * @return {string}
     */
    public getSentryId(): string | undefined {
        return this.sentryId;
    }

    /**
     * Set errors
     *
     * @param {any} errors
     * @return {BaseService}
     */
    public setErrors(errors: any): BaseService {
        this.errors = errors;
        return this;
    }

    public getErrors(): any | undefined {
        return this.errors;
    }

    /**
     * Retrieve current message
     *
     * @return {string | undefined}
     */
    public getMessage(): string | undefined {
        return this.message;
    }
}
