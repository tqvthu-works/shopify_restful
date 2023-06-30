import { appConfig } from '@config/app';

export class Provider {
    public static load(): void {
        const providers = appConfig.providers;
        for (const providerName of providers) {
            const provider = _.get(require(`@app/Providers/${providerName}`), providerName, null);
            if (!provider) {
                continue;
            }
            const instance = new provider();
            instance.register();
            instance.boot();
        }
    }
}
