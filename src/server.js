import express from 'express';

import { registerListener, registerRouters } from '@helpers';
import { checkEnv, registerLogging, registerPreprocessor, setupDocs } from '@tools';

/**
 * Spins up an express server at given socket parameters
 * @param {Number} PORT
 * @param {String} HOST
 */
export default function spinServer(PORT, HOST) {
	const app = express();

	registerLogging(app);
	checkEnv();
	registerPreprocessor(app);
	setupDocs(app);
	registerRouters(app);
	registerListener(app, PORT, HOST);
}
