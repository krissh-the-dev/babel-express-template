import morgan from 'morgan';
import chalk from 'chalk';

export default morgan((tokens, req, res) => {
	let {
		statusCode,
		methodName,
		requestURL,
		responseLength,
		responseTime,
		time,
		date
	} = extractAttributes(tokens, req, res);

	const coloredStatus = colorizeStatusCodes(statusCode);
	const coloredMethod = colorizeMethod(methodName);
	const coloredLengthInBytes = customizeLength(responseLength);
	const coloredResponseTime = customizeResponseTime(responseTime);

	return `[${date} ${time}] ${coloredStatus} | ${coloredMethod} ${requestURL} | ${coloredLengthInBytes}, ${coloredResponseTime}`;
});

function extractAttributes(tokens, req, res) {
	const statusCode = tokens.status(req, res);
	const methodName = tokens.method(req, res);
	const requestURL = tokens.url(req, res);
	const responseLength = tokens.res(req, res, 'content-length');
	const responseTime = tokens['response-time'](req, res);
	const time = new Date(tokens.date(req, res)).toLocaleTimeString('en-US');
	const date = new Date(tokens.date(req, res)).toLocaleDateString('en-GB');

	return { statusCode, methodName, requestURL, responseLength, responseTime, time, date };
}

function colorizeStatusCodes(statusCode) {
	let colorizedStatus;
	if (statusCode < 200) {
		colorizedStatus = chalk.gray.bold(statusCode);
	} else if (statusCode < 300) {
		colorizedStatus = chalk.green.bold(statusCode);
	} else if (statusCode < 400) {
		colorizedStatus = chalk.cyan.bold(statusCode);
	} else if (statusCode < 500) {
		colorizedStatus = chalk.yellow.bold(statusCode);
	} else {
		colorizedStatus = chalk.red.bold(statusCode);
	}
	return colorizedStatus;
}

function colorizeMethod(methodName) {
	let colorizedMethod;
	switch (methodName) {
		case 'GET':
			colorizedMethod = chalk.blue(methodName);
			break;

		case 'POST':
		case 'PUT':
			colorizedMethod = chalk.magenta(methodName);
			break;

		case 'PATCH':
			colorizedMethod = chalk.yellow(methodName);
			break;

		case 'DELETE':
			colorizedMethod = chalk.red(methodName);
			break;

		default:
			break;
	}
	return colorizedMethod;
}

function customizeLength(length) {
	let customizedLength;
	if (length >= 600 && length < 3000) {
		customizedLength = chalk.yellow(length + 'B');
	} else if (length >= 3000) {
		customizedLength = chalk.red(length + 'B');
	} else if (!length) {
		customizedLength = '0B';
	} else {
		customizedLength = `${length}B`;
	}
	return customizedLength;
}

function customizeResponseTime(resTime) {
	let coloredResponseTime;
	if (resTime >= 500 && resTime < 1000) {
		coloredResponseTime = chalk.yellow(resTime + 'ms');
	} else if (resTime >= 1000) {
		coloredResponseTime = chalk.red(resTime + 'ms');
	} else {
		coloredResponseTime = `${resTime}ms`;
	}
	return coloredResponseTime;
}
