import mongoose from 'mongoose';

import logger from '../logger';

const { DB_NAME, DB_PASSWORD, DB_SERVER } = process.env;
const uri = `mongodb+srv://${DB_SERVER}:${DB_PASSWORD}@coodesh-open-food-facts.pnzvf.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const connection = (): void => {
  const connect = () => {
    mongoose
      .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return logger.info('Successfully connected to database!');
      })
      .catch(e => {
        logger.error('Error connecting to database: ', e);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};

export default connection;
