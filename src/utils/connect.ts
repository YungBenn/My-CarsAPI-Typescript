import mongoose from 'mongoose';
import '../models/car.model';
import logger from './logger';
import config from '../config/env';

async function connect() {
  mongoose.set('strictQuery', false);
  const db = <string>config.db;

  try {
    await mongoose.connect(db);
    logger.info('DB Connected');
  } catch (err) {
    logger.error(err);
  }
}

export default connect;
