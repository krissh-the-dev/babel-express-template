import morgan from 'morgan';
import pc from 'picocolors';

/**
 * Request Logging with morgan
 *
 * Logs all the requests received and some relevant information, this can be
 * helpful in development, but it is recommended to turn this off in production
 * to reduce the  request processing queue length. Using this in production may
 * affect the performance of your app and slow down your server.
 *
 * @param {*} worker
 */
export default function requestLogger(worker) {
	return morgan((tokens, req, res) => {
		let { statusCode, methodName, requestURL, responseLength, responseTime, time, date } =
			extractAttributes(tokens, req, res);

		const coloredStatus = colorizeStatusCodes(statusCode);
		const coloredMethod = colorizeMethod(methodName);
		const coloredLengthInBytes = customizeLength(responseLength);
		const coloredResponseTime = customizeResponseTime(responseTime);

		return `[${date} ${time}] ${coloredStatus} | ${coloredMethod} ${requestURL} |${
			worker ? ` [worker ${worker.id}]` : ''
		} ${coloredLengthInBytes}, ${coloredResponseTime}`;
	});
}

/**
 * Extracts required attributes from the request
 */
function extractAttributes(tokens, req, res) {
	const statusCode = tokens.status(req, res);
	const methodName = tokens.method(req, res);
	const requestURL = tokens.url(req, res);
	const responseLength = tokens.res(req, res, 'content-length');
	const responseTime = tokens['response-time'](req, res);
	const time = new Date(tokens.date(req, res)).toLocaleTimeString('en-US');
	const date = new Date(tokens.date(req, res)).toLocaleDateString('en-GB');

	return {
		statusCode,
		methodName,
		requestURL,
		responseLength,
		responseTime,
		time,
		date
	};
}

/**
 * Colorize status codes based on the value
 * @param {number} statusCode
 * @returns {string} colorized status code string
 */
function colorizeStatusCodes(statusCode) {
	/*
	 * Adds pc colors to the status codes:
	 * Code		|		Color
	 * 1xx		|		gray
	 * 2xx		|		green
	 * 3xx		|		cyan
	 * 4xx 		|		yellow
	 * 5xx		|		red
	 */

	let colorizedStatus;
	if (statusCode < 200) {
		colorizedStatus = pc.gray(pc.bold(statusCode));
	} else if (statusCode < 300) {
		colorizedStatus = pc.green(pc.bold(statusCode));
	} else if (statusCode < 400) {
		colorizedStatus = pc.cyan(pc.bold(statusCode));
	} else if (statusCode < 500) {
		colorizedStatus = pc.yellow(pc.bold(statusCode));
	} else {
		colorizedStatus = pc.red(pc.bold(statusCode));
	}
	return colorizedStatus;
}

/**
 * Colorize method name based on the value
 * @param {string} methodName
 * @returns colorizes method name string
 */
function colorizeMethod(methodName) {
	/*
	 * Adds pc colors to the Http request methods:
	 * Method			|		Color
	 * Get				|		blue
	 * Post, Put	|		magenta
	 * patch			|		yellow
	 * delete 		|		red
	 */
	let colorizedMethod;
	switch (methodName) {
		case 'GET':
			colorizedMethod = pc.blue(methodName);
			break;

		case 'POST':
		case 'PUT':
			colorizedMethod = pc.magenta(methodName);
			break;

		case 'PATCH':
			colorizedMethod = pc.yellow(methodName);
			break;

		case 'DELETE':
			colorizedMethod = pc.red(methodName);
			break;

		default:
			break;
	}
	return colorizedMethod;
}

/**
 * Customize res length based on the length(size)
 * @param {number} length
 * @returns {string} colorized length string with unit
 */
function customizeLength(length) {
	/*
	 * Colorizes length string based on the value and adds 'B' as unit.
	 * size < 600 => default
	 * 600 <= size < 3000 => yellow
	 * size >= 3000 => red
	 */
	let customizedLength;
	if (length >= 600 && length < 3000) {
		customizedLength = pc.yellow(length + 'B');
	} else if (length >= 3000) {
		customizedLength = pc.red(length + 'B');
	} else if (!length) {
		customizedLength = '0B';
	} else {
		customizedLength = `${length}B`;
	}
	return customizedLength;
}

/**
 * Customize res time based
 * @param {number} resTime
 * @returns {string} colorized time string with unit
 */
function customizeResponseTime(resTime) {
	/*
	 * Colorizes response time string based on the value and adds 'ms' as unit.
	 * size < 500 => default
	 * 500 <= size < 1000 => yellow
	 * size >= 1000 => red
	 */
	let coloredResponseTime;
	if (resTime >= 500 && resTime < 1000) {
		coloredResponseTime = pc.yellow(resTime + 'ms');
	} else if (resTime >= 1000) {
		coloredResponseTime = pc.red(resTime + 'ms');
	} else {
		coloredResponseTime = `${resTime}ms`;
	}
	return coloredResponseTime;
}
