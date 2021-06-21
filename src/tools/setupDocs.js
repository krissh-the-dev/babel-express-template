import swaggerUI from 'swagger-ui-express';
import { name as appName, description, author, license } from 'package.json';
import apiDocs from '@routers/docs.js';

const documentObject = {
	swagger: '2.0',
	swaggerDefinition: {
		info: {
			title: appName,
			description,
			contact: { name: author },
			license
		}
	},
	paths: apiDocs
};

export default function setupDocs(app) {
	app.use('/docs', swaggerUI.serve, swaggerUI.setup(documentObject));
}
