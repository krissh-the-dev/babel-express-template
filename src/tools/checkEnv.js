import { requiredVariables } from 'package.json';
import pc from 'picocolors';

import logger from './logging';

/**
 * Checks if all the required environment variables are set.
 * To manage required environment variables, change `requiredVariables` in package.json.
 * Note that this checks only if the variable is defined and not if its valid/ not empty.
 */

export default function checkEnv() {
	const missing = requiredVariables.filter(v => !Object.keys(process.env).includes(v));

	if (missing.length !== 0) {
		logger.error(
			new Error(
				`Missing required environment variables: ${pc.yellow(
					missing.toString().replace(',', ', ')
				)}`
			).stack
		);
		process.exit(1);
	}
}
