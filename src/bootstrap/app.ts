import 'reflect-metadata';
import './boot';
import express from 'express';
import * as http from 'http';
import { ConsoleLog } from '@app/Helpers/ConsoleLog';
import * as Sentry from '@sentry/node';
import { sentryConfig } from '@config/sentry';
import { ExpressApp } from '@core/express-app';

export class App {
    private router: express.Router;
    private app: express.Express;

    constructor() {
        this.app = express();
        this.router = express.Router();
    }

    private initSentry(): void {
        if (!_.get(sentryConfig, 'DNS')) {
            return;
        }
        Sentry.init({
            dsn: sentryConfig.DNS,
            environment: process.env.APP_ENV,
            tracesSampleRate: 1.0,
        });
    }

    public serve(): http.Server {
        this.initSentry();
        ExpressApp.load(this.app, this.router); /* Express app load */
        const server: http.Server = http.createServer(this.app);
        server.listen(process.env.APP_PORT, () => {
            ConsoleLog.info(
                `Server running on http://localhost:${process.env.APP_PORT} in ${process.env.APP_ENV} env`,
            );
        });
        return server;
    }
}
