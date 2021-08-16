import chalk from 'chalk';
import config from 'config';
import winston from 'winston';

import { requestLogger } from '@middlewares';

const { format, transports } = winston;
const { combine, colorize, printf, json, prettyPrint, timestamp } = format;

/**
 * Configures morgan request logging and adds the middleware.
 */
export function registerRequestLogging(worker, app) {
	if (config.get('logRequests')) app.use(requestLogger(worker));
}

/**
 * Creates a customized console transport
 * @param {*} worker
 * @returns {*} WinstonConsoleTransport
 */
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

/**
 * Creates file transport
 * @param {string} filename filepath to log
 * @param {string} level Logging level
 * @returns WinstonTransport
 */
const fileLogTransport = (filename, level) => {
	return new transports.File({
		filename,
		level,
		format: combine(json(), timestamp(), prettyPrint())
	});
};

/**
 * Get winston configs and transports based on environment
 * @param {string} environment
 * @param {*} worker
 * @returns {{transports: Array, exceptionHandlers: Array, rejectionHandlers: Array}}
 */
const getWinstonOptions = (environment, worker) => {
	let winstonConfigs = {
		transports: [prettyConsoleTransport(worker), fileLogTransport('logs/verbose.log', 'verbose')],
		exceptionHandlers: [
			prettyConsoleTransport(worker),
			fileLogTransport('logs/exceptions.log', 'error')
		],
		rejectionHandlers: [
			prettyConsoleTransport(worker),
			fileLogTransport('logs/rejections.log', 'warn')
		]
	};

	if (environment !== 'production') {
		// pop out file transports, log only on console
		for (const configProp of Object.keys(winstonConfigs)) {
			winstonConfigs[configProp].pop();
		}
	}

	return { level: config.get('loggingLevel'), ...winstonConfigs };
};

const logger = winston.createLogger(getWinstonOptions(config.util.getEnv('NODE_ENV')));

/**
 * Reconfigures winston logger with worker(if exists)
 * @param {*} worker
 */
export function setupWinston(worker) {
	if (worker) logger.configure(getWinstonOptions(config.util.getEnv('NODE_ENV'), worker));
}

export default logger;
