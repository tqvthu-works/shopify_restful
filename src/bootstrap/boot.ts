import { Container } from 'inversify';
import { Provider } from '@core/provider';
import { I18n } from '@core/i18n';
import { Container as AppContainer } from '@core/container';
import { Manager as QueueManager } from '@core/queue/manager';

global.container = new Container();
global._ = require('lodash');

Provider.load();
I18n.load();
AppContainer.load();
QueueManager.load();

export {};
