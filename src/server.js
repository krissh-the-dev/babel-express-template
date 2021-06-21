import 'dotenv/config';

import {
  checkEnv,
  registerListener,
  registerLogging,
  registerPreprocessor,
  registerRouters,
  setupDocs
} from '@tools';
import config from 'config';
import express from 'express';

const PORT = config.get('port');
const HOST = config.get('host');

const app = express();

registerLogging(app);
checkEnv();
registerPreprocessor(app);
setupDocs(app);
registerRouters(app);
registerListener(app, PORT, HOST);
