import { JobQueue } from '@core/queue/job-queue';
import { QUEUE } from '@constant/queue';
import { Shop } from '@app/Models/Shop';
import { STATUS } from '@constant/common';

export class ShopWebhookUninstall extends JobQueue<{ id: number }> {
    constructor() {
        super();
        this.queue = QUEUE.WEBHOOK;
    }

    public async handle(): Promise<void> {
        const jobData = this.getPayload();
        const shop = await Shop.findByPk(jobData.id);

        if (!shop) {
            return;
        }

        await Shop.update(
            {
                uninstalled_at: new Date(),
                access_token: null,
                status: STATUS.INACTIVATED
            },
            {
                where: {
                    id: shop.id
                }
            }
        );
        return;
    }
}
