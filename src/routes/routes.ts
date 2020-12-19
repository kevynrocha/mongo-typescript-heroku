import { Router } from 'express';

const router = Router();

router.get('/', (_, res) => {
  res.status(200).json({
    message: 'Fullstack Challenge 20201030',
  });
});

export default router;
