import { injectable } from 'inversify';
import { Request, Response } from 'express';
import { HTTP_STATUS_CODE } from '@constant/common';
import { ShopWebhookUpdate } from '@app/Jobs/ShopWebhookUpdate';
import { ShopWebhookUninstall } from '@app/Jobs/ShopWebhookUninstall';

@injectable()
export class ShopWebhookController {
    public async update(request: Request, response: Response): Promise<Response> {
        new ShopWebhookUpdate().setPayload(request.body).dispatch();
        return response.status(HTTP_STATUS_CODE.OK).json();
    }
    public async uninstall(request: Request, response: Response): Promise<Response> {
        new ShopWebhookUninstall().setPayload({ id: request.body.id }).dispatch();
        return response.status(HTTP_STATUS_CODE.OK).json();
    }
}
