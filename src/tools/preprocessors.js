import config from 'config';
import helmet from 'helmet';

import { rateLimiter } from '@middlewares';

/**
 * Adds helmet and request rate limiting middlewares in production environment.
 */

export default function registerPreprocessor(app) {
	app.disable('x-powered-by'); // remove express powered by header
	if (config.util.getEnv('NODE_ENV') === 'production') {
		app.use(helmet());
		app.use(rateLimiter);
	}
}
