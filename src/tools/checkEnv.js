import { yellow } from 'chalk';
import { requiredVariables } from 'package.json';

/**
 * Checks if all the required environment variables are set.
 * To manage required environment variables, change `requiredVariables` in package.json.
 * Note that this checks only if the variable is defined and not if its valid/ not empty.
 */

export default function checkEnv() {
	const missing = requiredVariables.filter(v => !Object.keys(process.env).includes(v));

	if (missing.length !== 0) {
		throw new Error(
			`Missing required environment variables: ${yellow(missing.toString().replace(',', ', '))}`
		);
	}
}
