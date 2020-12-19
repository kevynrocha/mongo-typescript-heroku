import { Router } from 'express';

import usersRouter from './product.routes';
import coodeshRouter from './routes';

const routes = Router();

routes.use('/', coodeshRouter);
routes.use('/products', usersRouter);

export default routes;
