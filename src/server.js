import express from 'express';

import { requestLogger } from './middlewares';

const server = express();

// Request logging: refer - https://www.npmjs.com/package/morgan
server.use(requestLogger);

server.get('/', (req, res) => {
  /* Write your code */
  res.sendStatus(200);
});

server.listen(5000, () => {
  console.log('Server started');
});
