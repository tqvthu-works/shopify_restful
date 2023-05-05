import { appConfig } from '@config/app';
import path from 'path';
import fs from 'fs';
import i18next from 'i18next';

export class I18n {
    public static load(): void {
        const locales = appConfig.lang;
        const resources: any = {};
        const setResource = (locale: string, resources: any): void => {
            if (!_.get(resources, `${locale}.translation`)) {
                _.set(resources, `${locale}.translation`, {});
            }
            const files = fs.readdirSync(
                path.join(__dirname, `../lang/${locale}`),
            );
            files.forEach((file) => {
                const fileName = file.split('.')[0];
                const filePath = path.join(
                    __dirname,
                    `../lang/${locale}/${fileName}`,
                );
                resources[locale]['translation'][fileName] =
                    require(filePath).default;
            });
        };
        locales.forEach((locale) => {
            setResource(locale, resources);
        });
        i18next.init({
            lng: 'en', // if you're using a language detector, do not define the lng option
            debug: false,
            resources: resources,
        });
    }
}
