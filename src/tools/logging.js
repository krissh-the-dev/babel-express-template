import config from 'config';
import winston from 'winston';
import chalk from 'chalk';
import { requestLogger } from '@middlewares';

const { format, transports } = winston;
const { combine, colorize, printf, json, prettyPrint, timestamp } = format;

/**
 * Configures morgan request logging and adds the middleware.
 */

let worker;

export function registerRequestLogging(worker, app) {
	if (config.get('logRequests')) app.use(requestLogger);
}

const prettyConsoleTransport = worker => {
	return new transports.Console({
		format: combine(
			colorize(),
			json(),
			timestamp({ format: 'DD/MM/YYYY h:mm:ss A' }),
			printf(info => {
				const { level, message, timestamp } = info;
				return `[${timestamp}] ${level} |${worker ? ` [worker ${worker.id}]` : ''} ${message} ${
					level.includes('error') ? chalk.greenBright('\n\t - Stack trace ends here - \n') : ''
				}`;
			})
		)
	});
};

const fileLogTransport = (filename, level) => {
	return new transports.File({
		filename,
		level,
		format: combine(json(), timestamp(), prettyPrint())
	});
};

export function setupWinston(worker) {
	worker = worker;
}

export default winston.createLogger({
	level: config.get('loggingLevel'),
	transports: [prettyConsoleTransport(worker), fileLogTransport('logs/verbose.log', 'verbose')],
	exceptionHandlers: [
		prettyConsoleTransport(worker),
		fileLogTransport('logs/exceptions.log', 'error')
	],
	rejectionHandlers: [
		prettyConsoleTransport(worker),
		fileLogTransport('logs/rejections.log', 'warn')
	]
});
