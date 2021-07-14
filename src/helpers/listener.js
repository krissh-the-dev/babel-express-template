import chalk from 'chalk';
import logger from '@tools/logging';
import config from 'config';
import { name as appName, version } from 'package.json';

/**
 * Spins a server on given socket parameters [HOST, PORT].
 */

export default function registerListener(app, PORT, HOST) {
	const environment = config.util.getEnv('NODE_ENV');
	const server = app.listen(PORT, HOST, () => {
		const { address, port } = server.address();
		logger.info(
			`Started ${appName} v${version} ${chalk.yellow(environment)} server at port ${chalk.magenta(
				port
			)}`
		);
		logger.info(`Listening for requests at ${chalk.cyan(address + ':' + port)}`);
		logger.info(`Logging level set to: ${chalk.blue(logger.level)}`);
	});
}
