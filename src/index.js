import 'dotenv/config';
import config from 'config';
import spinServer from './server';

const PORT = config.get('port');
const HOST = config.get('host');
spinServer(PORT, HOST);
