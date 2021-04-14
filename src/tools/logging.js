import config from 'config';

import winston from 'winston';
import { requestLogger } from 'middlewares';

const { combine, colorize, printf } = winston.format;

export function registerLogging(app) {
	if (config.get('logRequests')) app.use(requestLogger);
}

export default winston.createLogger({
	level: config.get('loggingLevel'),
	transports: [
		new winston.transports.Console({
			format: combine(
				colorize(),
				printf(info => {
					return `[${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString(
						'en-US'
					)}] ${info.level} | ${info.message}`;
				})
			)
		}),
		new winston.transports.File({ filename: 'all-logs.log', level: 'error' })
	]
});

winston.format.combine(winston.format.colorize(), winston.format.simple());
