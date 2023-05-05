interface IJob {
    delay?: number
}
export interface IWebhookRegisterJobData extends IJob {
    shopify_domain: string;
    access_token: string;
}
