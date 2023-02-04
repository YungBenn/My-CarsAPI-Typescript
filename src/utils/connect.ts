import mongoose from 'mongoose';
import '../models/car.model';
import { logger } from './logger';

export async function connect() {
  mongoose.set('strictQuery', false);
  const db =
    <string>process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/carsDB';

  try {
    await mongoose.connect(db);
    logger.info('DB Connected');
  } catch (err) {
    logger.error(err);
  }
}
