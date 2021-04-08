import express from 'express';
import Logger from 'js-logger';
import chalk from 'chalk';
import 'dotenv/config';
import { StatusCodes } from 'http-status-codes';

import { requestLogger } from 'middlewares';

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';

Logger.useDefaults({
	defaultLevel: process.env.NODE_ENV === 'production' ? Logger.WARN : Logger.DEBUG,
	formatter: messages => {
		messages.unshift(
			`[${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString()}]`
		);
	}
});

const app = express();

app.use(requestLogger);

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
