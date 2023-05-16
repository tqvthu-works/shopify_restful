import { inject, injectable } from 'inversify';
import { ShopService } from '../../Services/ShopService';
import { Request, Response } from 'express';
import { ApiController } from './ApiController';

@injectable()
class ShopController extends ApiController {
    protected shopService: ShopService;

    constructor(@inject(ShopService) shopService: ShopService) {
        super();
        this.shopService = shopService;
    }
    public async detail(
        request: Request,
        response: Response,
    ): Promise<Response> {
        return this.response(response, await this.shopService.detail(request));
    }
}
export default container.resolve<ShopController>(ShopController);
