import { Router } from 'express';

import jobsRouter from './cron.routes';
import usersRouter from './product.routes';
import coodeshRouter from './routes';

const routes = Router();

routes.use('/', coodeshRouter);
routes.use('/products', usersRouter);
routes.use('/cron', jobsRouter);

export default routes;
