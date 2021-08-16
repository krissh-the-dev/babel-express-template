import config from 'config';
import { name as appName, description, license, version } from 'package.json';
import swaggerUI from 'swagger-ui-express';

import docs from '@docs';

const documentObject = {
	swagger: '2.0',
	info: {
		title: appName,
		description,
		license: {
			name: license
		},
		version
	},
	paths: docs
};

/**
 * Setup swagger docs engine
 * @param {*} app
 */
export default function setupDocs(app) {
	if (config.get('serveDocument'))
		app.use('/docs', swaggerUI.serve, swaggerUI.setup(documentObject));
}
