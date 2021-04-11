import express from 'express';
import Logger from 'js-logger';
import chalk from 'chalk';
import config from 'config';
import 'dotenv/config';
import { StatusCodes } from 'http-status-codes';

import { rateLimiter, requestLogger } from 'middlewares';

const PORT = config.get('port');
const HOST = config.get('host');

Logger.useDefaults({
	defaultLevel: config.get('loggingLevel'),
	formatter: messages => {
		messages.unshift(
			`[${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString('en-US')}]`
		);
	}
});

const app = express();

if (config.get('logRequests')) app.use(requestLogger);
app.use(rateLimiter);

app.get('*', (_req, res) => {
	res.sendStatus(StatusCodes.OK);
});

const server = app.listen(PORT, HOST);

server.once('listening', () => {
	const { address, port } = server.address();
	Logger.info(`Server started at port ${chalk.magenta(port)}`);
	Logger.info(`Listening for requests at: ${chalk.cyan(address + ':' + port)}`);
});

server.on('error', err => {
	Logger.error(chalk.red(err.name));
	Logger.warn(chalk.yellow(err.message));
	Logger.info(err.stack);
});
