import config from 'config';
import winston from 'winston';
import chalk from 'chalk';
import { requestLogger } from '@middlewares';

const { format, transports } = winston;
const { combine, colorize, printf, json, prettyPrint, timestamp } = format;

export function registerLogging(app) {
	if (config.get('logRequests')) app.use(requestLogger);
}

const prettyConsoleTransport = new transports.Console({
	format: combine(
		colorize(),
		json(),
		printf(info => {
			const { level, message } = info;
			return `[${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString(
				'en-US'
			)}] ${level} | ${message} ${
				level.includes('error') ? chalk.greenBright('\n\t - Stack trace ends here - \n') : ''
			}`;
		})
	)
});

const fileLogTransport = (filename, level) => {
	return new transports.File({
		filename,
		level,
		format: combine(json(), timestamp(), prettyPrint())
	});
};

export default winston.createLogger({
	level: config.get('loggingLevel'),
	transports: [prettyConsoleTransport, fileLogTransport('logs/verbose.log', 'verbose')],
	exceptionHandlers: [prettyConsoleTransport, fileLogTransport('logs/exceptions.log', 'error')],
	rejectionHandlers: [prettyConsoleTransport, fileLogTransport('logs/rejections.log', 'warn')]
});
