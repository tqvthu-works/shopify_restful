import 'dotenv/config';
import '../module-aliases';
import { App } from '@bootstrap/app';
import { Handler } from './Exceptions/Handler';

Handler.handle();
new App().serve();
