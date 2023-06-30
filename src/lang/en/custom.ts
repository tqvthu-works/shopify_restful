export default {
    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    shopify: {
        get_failed: 'Failed to get {{ attribute }}',
        validate_failed: 'Failed to validate {{ attribute }}',
        webhook_failed: 'Invalid webhook signature'
    },
    http: {
        not_found: 'route not found',
        internal_error: 'internal server error'
    }
};
