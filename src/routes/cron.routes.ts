import { Router } from 'express';

import job from '../jobs/productsJob';

const router = Router();

router.get('/', (req, res) => {
  job.start();
  return res.json({
    message: 'Running job',
  });
});

export default router;
