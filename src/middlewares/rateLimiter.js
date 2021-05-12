import rateLimit from 'express-rate-limit';

/**
 * Rate Limiting
 * Block requests from an IP for 10 minutes if 20 invalid requests
 * (both client & server errors) are made within 10 minutes
 */

export default rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 20,
	message: 'Request limit exhausted for this IP, try again later.',
	skipSuccessfulRequests: true
});
