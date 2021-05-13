import chalk from 'chalk';
import logger from '@tools/logging';

export default function registerListener(app, PORT, HOST) {
	const server = app.listen(PORT, HOST, () => {
		const { address, port } = server.address();
		logger.info(`Server started at port ${chalk.magenta(port)}`);
		logger.info(`Listening for requests at ${chalk.cyan(address + ':' + port)}`);
	});
}
