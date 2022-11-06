import config from 'config';
import { name as appName, version } from 'package.json';
import pc from 'picocolors';

import { logger } from '@tools';

/**
 * Spins a server on given socket parameters [HOST, PORT].
 * @param {*} ExpressAppInstance
 * @param {string} HOST - Hostname.
 * @param {number} PORT - Port number.
 */

export default function registerListener(app, PORT, HOST) {
	const environment = config.util.getEnv('NODE_ENV');
	const server = app.listen(PORT, HOST, () => {
		const { address, port } = server.address();
		logger.info(
			`Started ${appName} v${version} ${pc.yellow(environment)} server at port ${pc.magenta(port)}`
		);
		logger.info(`Listening for requests at ${pc.cyan(address + ':' + port)}`);
		logger.info(`Console logging level set to: ${pc.blue(logger.level)}`);
		logger.info(`File logging level set to: ${pc.blue(config.get('fileLoggingLevel'))}`);
	});

	return server;
}
