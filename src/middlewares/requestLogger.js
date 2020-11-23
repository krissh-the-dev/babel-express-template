import morgan from 'morgan';
import chalk from 'chalk';

export default morgan((tokens, req, res) => {
  let status = tokens.status(req, res);
  let method = tokens.method(req, res);
  let url = tokens.url(req, res);
  let length = tokens.res(req, res, 'content-length');
  let resTime = tokens['response-time'](req, res);
  let time = new Date(tokens.date(req, res)).toLocaleTimeString();

  if (status < 200) {
    status = chalk.gray.bold(status);
  } else if (status < 300) {
    status = chalk.green.bold(status);
  } else if (status < 400) {
    status = chalk.cyan.bold(status);
  } else if (status < 500) {
    status = chalk.yellow.bold(status);
  } else {
    status = chalk.red.bold(status);
  }

  switch (method) {
    case 'GET':
      method = chalk.blue(method);
      break;

    case 'POST':
    case 'PUT':
      method = chalk.magenta(method);
      break;

    case 'PATCH':
      method = chalk.yellow(method);
      break;

    case 'DELETE':
      method = chalk.red(method);
      break;

    default:
      break;
  }

  if (length > 600) {
    length = chalk.yellow(length);
  } else if (length > 1500) {
    length = chalk.red(length);
  }

  if (resTime > 100) {
    resTime = chalk.red(resTime);
  }

  return `[${time}] ${status} | ${method} ${url} > ${length} B | ${resTime} ms`;
});
