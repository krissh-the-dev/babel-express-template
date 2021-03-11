import express from 'express';
import Logger from 'js-logger';
import chalk from 'chalk';
import 'dotenv/config';

import { requestLogger } from './middlewares';

const PORT = process.env.PORT || 5000;
Logger.useDefaults({
	defaultLevel: process.env.NODE_ENV === 'production' ? Logger.ERROR : Logger.INFO,
	formatter: messages => {
		messages.unshift(
			`[${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString()}]`
		);
	}
});
const server = express();

server.use(requestLogger);

server.get('*', (_req, res) => {
	res.sendStatus(200);
});

server.listen(PORT, () => {
	Logger.info(`Server started at port ${chalk.magenta(PORT)}`);
	Logger.info(`Listening for requests at: ${chalk.cyan(`http://127.0.0.1:${PORT}`)}`);
});
