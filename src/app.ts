import dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
import { connect } from './utils/connect';
import { CarsRouter } from './routes/cars.route';
import { logger } from './utils/logger';
import { error } from './middleware/404';

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use('/', CarsRouter);

// 404 handle 
app.use(error)

app.listen(port, async () => {
  logger.info(`server is running on http://localhost:${port}`);
  await connect();
});
