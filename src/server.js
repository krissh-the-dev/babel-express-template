import express from 'express';
import 'dotenv/config';
import config from 'config';

import { registerListener, registerLogging, registerPreprocessor, registerRouters } from '@tools';

const PORT = config.get('port');
const HOST = config.get('host');

const app = express();

registerLogging(app);
registerPreprocessor(app);
registerRouters(app);
registerListener(app, PORT, HOST);
