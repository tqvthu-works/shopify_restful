import { color } from 'console-log-colors';

export class ConsoleLog {
    public static info(message: any, includeDateTime = true): void {
        if (!includeDateTime) {
            console.log(color.bgCyan(`INFO`), message);
        } else {
            console.log(
                color.bgCyan(`INFO ${new Date().toISOString()}`),
                message,
            );
        }
    }

    public static debug(message: any, includeDateTime = true): void {
        if (!includeDateTime) {
            console.log(color.bgYellow(`DEBUG`), message);
        } else {
            console.log(
                color.bgYellow(`DEBUG ${new Date().toISOString()}`),
                message,
            );
        }
    }

    public static error(message: any, includeDateTime = true): void {
        if (!includeDateTime) {
            console.log(color.bgRed(`ERROR`), message);
        } else {
            console.log(
                color.bgRed(`ERROR ${new Date().toISOString()}`),
                message,
            );
        }
    }
}
