import { inject, injectable } from 'inversify';
import { AuthService } from '@app/Services/AuthService';
import { Request, Response } from 'express';
import { ApiController } from './ApiController';
import { shopifyConfig } from '@config/shopify';

@injectable()
export class AuthController extends ApiController {
    protected service: AuthService;

    constructor(@inject('AuthService') service: AuthService) {
        super();
        this.service = service;
    }
    public async install(request: Request, response: Response): Promise<Response> {
        return this.response(response, await this.service.buildInstallUrl(request));
    }
    public async authCallback(request: Request, response: Response): Promise<void> {
        await this.service.handleAuthCallback(request);
        /* change to your url */
        const tmpUrl = `https://admin.shopify.com/store/workshop-nfs/apps/${shopifyConfig.api_key}`;

        return response.redirect(tmpUrl);
    }
}
