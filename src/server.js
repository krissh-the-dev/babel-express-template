import express from 'express';
import morgan from 'morgan';

const server = express();

// Request logging: refer - https://www.npmjs.com/package/morgan
server.use(morgan('tiny'));

server.get('/', (req, res) => {
  // write code
});

server.listen(5000, () => {
  console.log('Server started');
});
