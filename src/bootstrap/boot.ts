import { Container } from 'inversify';
import { Provider } from '@core/provider';
import { I18n } from '@core/i18n';
import { Container as AppContainer } from '@core/container';
import { Manager as QueueManager } from '@core/queue/manager';
import { handler } from '@core/http/controller-handler';

global.container = new Container();
global._ = require('lodash');
global.ActionHandler = handler;

Provider.load();
I18n.load();
AppContainer.load();
QueueManager.load();

export {};
