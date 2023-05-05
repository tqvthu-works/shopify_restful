import 'module-alias/register';
import { Handler } from './Exceptions/Handler';
Handler.handle();

const args = process.argv.slice(2);
const [connection] = args;
const queue = process.env.npm_config_queue;
import { Worker } from '@bootstrap/worker';
new Worker(queue, connection).serve();
