import express from 'express';

import { registerListener, registerRouters } from '@helpers';
import { registerRequestLogging, registerPreprocessor, setupDocs, setupWinston } from '@tools';

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
	registerPreprocessor(app);
	setupDocs(app);
	registerRouters(app);
	registerListener(app, PORT, HOST);
}
