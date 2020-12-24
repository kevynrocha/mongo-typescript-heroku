import { Router } from 'express';

import { cronStart } from '../jobs/productsJob';

const router = Router();

router.get('/', (req, res) => {
  cronStart();

  return res.json({
    message: 'Running job...',
  });
});

export default router;
