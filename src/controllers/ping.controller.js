import { StatusCodes } from 'http-status-codes';

/**
 * Controllers for all /ping routes
 *
 * Available controllers: testPing
 */

export function testPing(_req, res) {
	/**
	 * Ping the server
	 * @param {}
	 * @returns Status `200`
	 */
	res.sendStatus(StatusCodes.OK);
}

export default { testPing };
