import { Router } from 'express';

import { testPing } from '@controllers/ping.controller';

const router = Router();

/**
 * Router for /ping routes
 *
 * Available routes: /
 */

router.get('/', testPing);

export default router;
