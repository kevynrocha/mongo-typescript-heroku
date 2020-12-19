import { Router } from 'express';

import ProductController from '../controllers/Product/product.controller';

const router = Router();

router.get('/', ProductController.index);
router.get('/:code', ProductController.show);
router.put('/:code', ProductController.update);
router.delete('/:code', ProductController.destroy);

export default router;
