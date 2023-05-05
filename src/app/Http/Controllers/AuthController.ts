import { inject, injectable } from 'inversify';
import { AuthService } from '../../Services/AuthService';
import { Request, Response } from 'express';
import { ApiController } from './ApiController';
import 'module-alias/register';

@injectable()
export class AuthController extends ApiController {
    protected service: AuthService;

    constructor(@inject(AuthService) service: AuthService) {
        super();
        this.service = service;
    }
    public async install(
        request: Request,
        response: Response,
    ): Promise<Response> {
        return this.response(
            response,
            await this.service.buildInstallUrl(request),
        );
    }
    public async authCallback(
        request: Request,
        response: Response,
    ): Promise<Response> {
        return this.response(
            response,
            await this.service.handleAuthCallback(request),
        );
    }
}
