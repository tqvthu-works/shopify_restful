import 'module-alias/register';
import 'dotenv/config';
import '../module-aliases';
import { Handler } from './Exceptions/Handler';
import { Worker } from '@bootstrap/worker';

Handler.handle();
const args = process.argv.slice(2);
const [connection] = args;
const queue = process.env.npm_config_queue;
new Worker(queue, connection).serve();
