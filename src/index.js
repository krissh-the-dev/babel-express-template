import cluster from 'cluster';
import config from 'config';
import 'dotenv/config';

import { Labels } from '@constants';
import { logger } from '@tools';

import spinServer from './server';

const PORT = config.get('port');
const HOST = config.get('host');
const isClusteringEnabled = config.get('enableClustering');

let server;

if (isClusteringEnabled && cluster.isPrimary) {
	setupWorkerProcesses();
} else {
	server = spinServer(PORT, HOST, cluster.worker);
}

/**
 * Creates worker processes for each core of the cpu for the server to run
 */
function setupWorkerProcesses() {
	let workers = [];

	const noOfCores = require('os').cpus().length;
	logger.info(
		`[${
			Labels.MAIN_THREAD_LABEL
		}] Setting up ${noOfCores} ${Labels.WORKER_THREAD_LABEL.toLowerCase()}s`
	);

	for (let i = 0; i < noOfCores; i++) {
		const worker = cluster.fork();
		workers.push(worker);
		workers[i].on('message', message => {
			logger.info(`[${Labels.WORKER_THREAD_LABEL} ${worker.id}] ${message}`);
		});
	}

	cluster.on('online', worker => {
		logger.info(`[${Labels.WORKER_THREAD_LABEL} ${worker.id}] Online`);
	});

	cluster.on('error', (worker, code, signal) => {
		logger.warn(
			`[${Labels.WORKER_THREAD_LABEL} ${worker.id}] Offline. Died with code: ${code} and signal: ${signal}`
		);

		logger.info(`[${Labels.MAIN_THREAD_LABEL}] Forking another worker`);
		let newFork = cluster.fork();
		newFork.on('message', message => {
			logger.info(`[${Labels.WORKER_THREAD_LABEL} ${worker.id}] ${message}`);
		});
		workers.push(newFork);
	});
}

module.exports = server;
