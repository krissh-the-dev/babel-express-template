import 'dotenv/config';
import config from 'config';
import cluster from 'cluster';

import logger from '@tools/logging';
import spinServer from './server';

const PORT = config.get('port');
const HOST = config.get('host');
const isClusteringEnabled = config.get('enableClustering');

if (isClusteringEnabled && cluster.isMaster) {
	setupWorkerProcesses();
} else {
	spinServer(PORT, HOST);
}

function setupWorkerProcesses() {
	let workers = [];

	const noOfCores = require('os').cpus().length;
	logger.info(`[master] Setting up ${noOfCores} workers`);

	for (let i = 0; i < noOfCores; i++) {
		workers.push(cluster.fork());
		workers[i].on('message', message => {
			logger.info(`[worker ${i}, pid: ${workers[i].process.pid}] ${message}`);
		});
	}

	cluster.on('online', worker => {
		logger.info(`[Worker ${worker.process.pid}] is listening`);
	});

	cluster.on('error', (worker, code, signal) => {
		logger.warn(`[Worker ${worker.process.pid}] died with code: ${code}, signal: ${signal}`);

		logger.info('[master]: Forking another worker');
		let newFork = cluster.fork();
		newFork.on('message', message => {
			logger.info(`[worker ${workers.length}, pid: ${newFork.process.pid}] ${message}`);
		});
		workers.push(newFork);
	});
}
