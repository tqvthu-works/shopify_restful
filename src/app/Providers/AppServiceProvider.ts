import { ServiceProvider } from '@core/contract';

export class AppServiceProvider implements ServiceProvider {
    public register(): void {
        /* Can code here to register some service, model..etc injection */
    }
    public boot(): Promise<void> {
        return;
    }
}
