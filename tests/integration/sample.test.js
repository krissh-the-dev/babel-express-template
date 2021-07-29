import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

describe('Integration tests', () => {
	const server = require('../../src/index');

	afterEach(() => {
		server.close();
	});
	it('GET /ping to respond with 200', async () => {
		const res = await request(server).get('/ping');
		expect(res.statusCode).toBe(StatusCodes.OK);
	});
});
