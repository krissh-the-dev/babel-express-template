import express from 'express';

const server = express();

server.get('/', (req, res) => {
  // write code
});

server.listen(5000, () => {
  console.log('Server started');
});
