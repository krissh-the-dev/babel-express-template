import express from 'express';

import { registerListener, registerRouters } from '@helpers';
import { checkEnv, registerLogging, registerPreprocessor, setupDocs } from '@tools';

export default function spinServer(PORT, HOST) {
	const app = express();

	registerLogging(app);
	checkEnv();
	registerPreprocessor(app);
	setupDocs(app);
	registerRouters(app);
	registerListener(app, PORT, HOST);
}
