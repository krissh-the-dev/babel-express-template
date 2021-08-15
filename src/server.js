import express from 'express';

import { registerListener, registerRouters } from '@helpers';
import {
	checkEnv,
	registerRequestLogging,
	registerPreprocessor,
	setupDocs,
	setupWinston,
	handleServerErrors
} from '@tools';

/**
 * Spins up an express server at given socket parameters
 * @param {Number} PORT
 * @param {String} HOST
 * @param {*} worker
 */
export default function spinServer(PORT, HOST, worker) {
	const app = express();

	registerRequestLogging(worker, app);
	setupWinston(worker);
	checkEnv();
	registerPreprocessor(app);
	setupDocs(app);
	registerRouters(app);
	handleServerErrors(app);

	return registerListener(app, PORT, HOST);
}
