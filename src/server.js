import express from 'express';

import { registerListener, registerRouters } from '@helpers';
import {
	checkEnv,
	registerRequestLogging,
	registerPreprocessor,
	setupDocs,
	setupWinston
} from '@tools';

/**
 * Spins up an express server at given socket parameters
 * @param {Number} PORT
 * @param {String} HOST
 */
export default function spinServer(worker, PORT, HOST) {
	const app = express();

	registerRequestLogging(worker, app);
	setupWinston(worker);
	checkEnv();
	registerPreprocessor(app);
	setupDocs(app);
	registerRouters(app);
	registerListener(app, PORT, HOST);
}
