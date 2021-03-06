import './config/env';
import 'express-async-errors';
import './jobs/productsJob';

import cors from 'cors';
import express from 'express';

import connection from './database/connection';
import logger from './logger';
import routes from './routes';

const port = process.env.PORT || 3333;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1', routes);

connection();

app
  .listen(port, () => {
    logger.info(`Server started in ${port} port!`);
  })
  .on('error', e => logger.error(`Server don't started`, e));
