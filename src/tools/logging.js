import config from 'config';
import pc from 'picocolors';
import winston from 'winston';

import { FileLogLevels } from '@constants';
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
					level.includes('error') ? pc.green('\n\t - Stack trace ends here - \n') : ''
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
 * @param {boolean} isFileLoggingEnabled
 * @param {*} worker
 * @returns {{transports: Array, exceptionHandlers: Array, rejectionHandlers: Array}}
 */
const getWinstonOptions = (fileLoggingLevel, worker) => {
	const DEFAULT_CONFIG = { level: config.get('consoleLoggingLevel') };
	const VERBOSE_CONFIG = {
		transports: [prettyConsoleTransport(worker), fileLogTransport('logs/verbose.log', 'verbose')]
	};
	const ERROR_CONFIG = {
		exceptionHandlers: [
			prettyConsoleTransport(worker),
			fileLogTransport('logs/exceptions.log', 'error')
		],
		rejectionHandlers: [
			prettyConsoleTransport(worker),
			fileLogTransport('logs/rejections.log', 'warn')
		]
	};

	switch (fileLoggingLevel) {
		case FileLogLevels.ALL:
			return {
				...DEFAULT_CONFIG,
				...VERBOSE_CONFIG,
				...ERROR_CONFIG
			};

		case FileLogLevels.ERRORS:
			return {
				...DEFAULT_CONFIG,
				...ERROR_CONFIG
			};

		case FileLogLevels.OFF:
		default:
			return { level: config.get('consoleLoggingLevel') };
	}
};

const logger = winston.createLogger(getWinstonOptions(config.get('fileLoggingLevel')));

/**
 * Reconfigures winston logger with worker(if exists)
 * @param {*} worker
 */
export function setupWinston(worker) {
	if (worker) logger.configure(getWinstonOptions(config.get('fileLoggingLevel'), worker));
}

export default logger;
