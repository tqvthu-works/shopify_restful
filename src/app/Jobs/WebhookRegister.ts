import { JobQueue } from '@core/queue/job-queue';
import { IWebhookRegisterJobData } from '@contract/queue';
import { QUEUE } from '@constant/queue';
import { ShopifyApiService } from '@app/Services/ShopifyApiService';
import { shopifyConfig } from '@config/index';

export class WebhookRegister extends JobQueue<IWebhookRegisterJobData> {
    constructor() {
        super();
        this.queue = QUEUE.WEBHOOK;
    }

    public async handle(): Promise<void> {
        const jobData = this.getPayload();
        const shopifyDomain = jobData.shopify_domain;
        const accessToken = jobData.access_token;
        const shopifyApiService: ShopifyApiService =
            container.get(ShopifyApiService);
        shopifyApiService.init(shopifyDomain, accessToken);

        // Delete all webHook before add Web Hook
        await this.deleteExistingWebhooks(shopifyApiService);

        const webhooks = shopifyConfig.webhooks ?? [];
        for await (const v of webhooks) {
            await shopifyApiService.post('webhooks.json', {
                webhook: {
                    address: v.address,
                    topic: v.topic,
                    format: 'json',
                },
            });
        }

        return;
    }
    private async deleteExistingWebhooks(
        shopifyApiService: ShopifyApiService,
    ): Promise<void> {
        const response = await shopifyApiService.get('webhooks.json');
        if (!response.status) {
            return;
        }
        const webhooks = _.get(response.data, 'webhooks', []);
        if (!webhooks.length) {
            return;
        }
        for await (const value of webhooks) {
            await shopifyApiService.delete(`webhooks/${value.id}.json`);
        }
    }
}
