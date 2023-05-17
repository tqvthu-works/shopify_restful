import { Response } from 'express';
import { BaseService } from '../../Services/BaseService';
import * as httpStatus from 'http-status';
import { injectable } from 'inversify';
import { apiConfig } from '../../../config/api';

@injectable()
export class ApiController {
    /**
     * Json response api
     *
     * @param data BaseService|any
     * @param status boolean
     * @param message string
     */
    public response(
        res: Response,
        data: BaseService | any,
        status = true,
        message = '',
    ): any {
        if (!(data instanceof BaseService)) {
            return res.status(httpStatus.OK).json({
                status: data?.status ?? status,
                message: message || apiConfig.message.error.common,
                data: data || [],
            });
        }

        const result = {
            status: data.getStatus(),
            message: data.getMessage(),
            data: data.getData(),
        };
        if (data.getErrors() || data.getSentryId()) {
            result['errors'] = data.getErrors();
            result['sentry_id'] = data.getSentryId();
        }

        return res.status(data.getHttpCode()).json(result);
    }
}
