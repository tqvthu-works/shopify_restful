import { JobQueue } from '@core/queue/job-queue';
import { IShopifyStore } from '@contract/shopify/shop';
import { QUEUE } from '@constant/queue';
import { Shop } from '@app/Models/Shop';
export class ShopWebhookUpdate extends JobQueue<IShopifyStore> {
    constructor() {
        super();
        this.queue = QUEUE.WEBHOOK;
    }

    public async handle(): Promise<void> {
        const jobData = this.getPayload();
        const shop = await Shop.findOne({ where: { id: jobData.id } });
        if (!shop) {
            return;
        }
        shop.domain = jobData.domain;
        shop.name = jobData.name;
        shop.plan_name = jobData.plan_name;
        shop.owner = jobData.shop_owner;
        shop.email = jobData.email;
        shop.phone = jobData.phone;
        shop.timezone = jobData.iana_timezone;
        shop.country = jobData.country;
        shop.currency = jobData.currency;
        shop.money_format = jobData.money_format;
        shop.money_with_currency_format = jobData.money_with_currency_format;
        await shop.save();
        return;
    }
}
