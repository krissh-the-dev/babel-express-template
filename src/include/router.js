import { PingRouter } from 'routers';

export default function registerRouters(app) {
	app.use('/ping', PingRouter);
}
