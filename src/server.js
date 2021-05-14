import express from 'express';
import 'dotenv/config';
import config from 'config';

import {
	checkEnv,
	registerListener,
	registerLogging,
	registerPreprocessor,
	registerRouters
} from '@tools';

const PORT = config.get('port');
const HOST = config.get('host');

const app = express();

registerLogging(app);
checkEnv();
registerPreprocessor(app);
registerRouters(app);
registerListener(app, PORT, HOST);
