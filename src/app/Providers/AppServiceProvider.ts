import { AuthService } from '@app/Services/AuthService';
import { ServiceProvider } from '@core/contract';
import { ShopifyApiService } from '@app/Services/ShopifyApiService';
import { ShopService } from '@app/Services/ShopService';
import { ShopService as SfShopService } from '@app/Services/Storefront/ShopService';

export class AppServiceProvider implements ServiceProvider {
    public register(): void {
        this.bindServices();
    }
    public boot(): Promise<void> {
        return;
    }
    private bindServices(): void {
        container.bind('ShopService').to(ShopService);
        container.bind('ShopifyApiService').to(ShopifyApiService);
        container.bind('AuthService').to(AuthService);
        container.bind('SfShopService').to(SfShopService);
    }
}
