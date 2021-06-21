import apiDocs from '@routers/docs.js';
import config from 'config';
import { description, license, name as appName, version } from 'package.json';
import swaggerUI from 'swagger-ui-express';

const documentObject = {
	swagger: '2.0',
	info: { title: appName, description, license: { name: license }, version },
	paths: apiDocs
};

export default function setupDocs(app) {
	if (config.get('serveDocument'))
		app.use('/docs', swaggerUI.serve, swaggerUI.setup(documentObject));
}
