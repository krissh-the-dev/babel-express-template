import express from 'express';
import Logger from 'js-logger';
import chalk from 'chalk';

// Must import dotenv config before config
import 'dotenv/config';
import config from 'config';

import { registerLogging, registerPreprocessor, registerRouters } from 'include';

const PORT = config.get('port');
const HOST = config.get('host');

const app = express();
registerLogging(app);
registerPreprocessor(app);
registerRouters(app);

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
