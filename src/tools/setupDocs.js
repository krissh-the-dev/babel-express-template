import swaggerUI from 'swagger-ui-express';
import { name as appName, description, license, version } from 'package.json';
import config from 'config';
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

export default function setupDocs(app) {
	if (config.get('serveDocument'))
		app.use('/docs', swaggerUI.serve, swaggerUI.setup(documentObject));
}
