import config from 'config';
import helmet from 'helmet';
import { rateLimiter } from 'middlewares';

export default function registerPreprocessor(app) {
	if (config.util.getEnv('NODE_ENV') === 'production') {
		app.use(helmet());
		app.use(rateLimiter);
	}
}
