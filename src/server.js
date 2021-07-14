import express from 'express';
import 'dotenv/config';
import config from 'config';

import { registerListener, registerRouters } from '@helpers';
import { checkEnv, registerLogging, registerPreprocessor, setupDocs } from '@tools';

export default function spinServer() {
	const PORT = config.get('port');
	const HOST = config.get('host');

	const app = express();

	registerLogging(app);
	checkEnv();
	registerPreprocessor(app);
	setupDocs(app);
	registerRouters(app);
	registerListener(app, PORT, HOST);
}

spinServer();
