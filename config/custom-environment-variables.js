/**
 * These values will be loaded from '.env' file
 * refer docs: https://github.com/lorenwest/node-config/wiki/Environment-Variables
 * these values will be loaded from other configs if env is not set
 *
 * logRequests can be exposed from env to make it easier to troubleshoot in production
 */

module.exports = {
	host: 'HOST',
	port: 'PORT',
	logRequests: 'VERBOSE_REQ_LOGGING'
};
