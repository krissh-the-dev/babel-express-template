import 'express-async-errors';

import { PingRouter } from '@routers';

/**
 * Registers all routes and handles server errors.
 * @param {*} ExpressAppInstance
 */

export default function registerRouters(app) {
	app.use('/ping', PingRouter);
}
