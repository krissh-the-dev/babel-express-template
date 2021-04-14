import Logger from 'js-logger';
import config from 'config';

import { requestLogger } from 'middlewares';

export default function registerLogging(app) {
	Logger.useDefaults({
		defaultLevel: config.get('loggingLevel'),
		formatter: messages => {
			messages.unshift(
				`[${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString('en-US')}]`
			);
		}
	});

	if (config.get('logRequests')) app.use(requestLogger);
}
