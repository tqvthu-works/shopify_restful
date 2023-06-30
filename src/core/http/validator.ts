import { ValidationChain, validationResult, ValidationError } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS_CODE } from '@constant/common';
import { apiConfig } from '@config/api';

export abstract class Validator {
    private validations: ValidationChain[];
    protected request: Request;
    protected response: Response;
    protected next: NextFunction;
    protected resourceNotFound = false; // used for resource not found on api get detail

    constructor(request: Request, response: Response, next: NextFunction) {
        this.request = request;
        this.response = response;
        this.next = next;
    }
    protected abstract rules(): Promise<ValidationChain[]>;
    /**
     * common validate for all feature
     * @return {Response}          [description]
     */
    public static validate(
        request: Request,
        response: Response,
        next: NextFunction
    ): Response | any {
        /* prevent large per_page*/
        const perPage = request.query['per_page'] ?? request.body['per_page'] ?? null;
        if (perPage && (isNaN(perPage) || perPage == 0 || perPage > apiConfig.max_per_page)) {
            return response.status(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY).json({
                status: false,
                message: 'per_page is invalid.'
            });
        }
        return next();
    }

    public async handle(): Promise<Response | any> {
        this.validations = await this.rules();
        for (const validation of this.validations) {
            /** Validate one by one */
            const result = await validation.run(this.request);
            if (result['errors'].length) {
                break;
            }
        }

        const errors = validationResult(this.request).formatWith(e => this.errorFormatter(e));
        if (errors.isEmpty()) {
            return this.next();
        }
        if (this.resourceNotFound) {
            return this.response.status(HTTP_STATUS_CODE.NOT_FOUND).json({
                status: false,
                errors: Object.assign({}, ...errors.array())
            });
        }
        return this.response.status(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY).json({
            status: false,
            errors: Object.assign({}, ...errors.array())
        });
    }
    private errorFormatter({ msg, param }: ValidationError): any {
        if (typeof msg === 'object') {
            return msg;
        }
        return { [param]: msg };
    }
}
