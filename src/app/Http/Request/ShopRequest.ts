import { Validator } from '@core/http/validator';
import { ValidationChain, query } from 'express-validator';
import i18next from 'i18next';

export class ShopRequest extends Validator {
    public async rules(): Promise<ValidationChain[]> {
        const chains: ValidationChain[] = [
            query('shopify_domain')
                .if(query('is_testing').exists())
                .notEmpty()
                .withMessage(
                    i18next.t('validation.required_if', {
                        attribute: 'shopify_domain',
                        other: 'is_testing',
                        value: true,
                    }),
                ),
        ];

        return chains;
    }
}
