import * as Sentry from '@sentry/node';
export class Handler {
    public static handle(): void {
        process.on('uncaughtException', (err) => {
            console.log('uncaughtException', err);
            Sentry.captureException(err, { level: 'error' });
        });
        process.on('unhandledRejection', (err) => {
            console.log('unhandledRejection', err);
            Sentry.captureException(err, { level: 'error' });
        });
    }
}
