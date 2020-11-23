import express from 'express';
import Logger from 'js-logger';
import chalk from 'chalk';
import 'dotenv/config';

import { requestLogger } from './middlewares';

const PORT = process.env.PORT || 5000;
Logger.useDefaults();
Logger.setLevel(process.env.NODE_ENV === 'production' ? Logger.ERROR : Logger.INFO);
const server = express();

server.use(requestLogger);

server.get('/', (req, res) => {
  res.sendStatus(200);
});

server.listen(PORT, () => {
  Logger.info(`Server started at port ${chalk.magenta(PORT)}`);
  Logger.info(`Listening for requests at: ${chalk.cyan(`http://127.0.0.1:${PORT}`)}`);
});
