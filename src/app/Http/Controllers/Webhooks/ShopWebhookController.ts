import { injectable } from 'inversify';
import { Request, Response } from 'express';
import { HTTP_STATUS_CODE } from '@constant/common';
import { ShopWebhookUpdate } from '@app/Jobs/ShopWebhookUpdate';

@injectable()
class ShopWebhookController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        new ShopWebhookUpdate().setPayload(request.body).dispatch();
        return response.status(HTTP_STATUS_CODE.OK).json();
    }
}
export default container.resolve<ShopWebhookController>(ShopWebhookController);
