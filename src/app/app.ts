import 'module-alias/register';
import 'dotenv/config';
import { App } from '@bootstrap/app';
import { Handler } from './Exceptions/Handler';
Handler.handle();
new App().serve();
