import express, { Application } from 'express';
import cors from 'cors';
import connect from './utils/connect';
import CarsRouter from './routes/car.route';
import logger from './utils/logger';
import error from './middleware/404';
import UserRouter from './routes/auth.route';
import deserializedToken from './middleware/deserializedToken';
import limiter from './middleware/rateLimit';
import config from './config/env';

const app: Application = express();
const port = config.port || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(limiter);

app.use(deserializedToken);

// routes
app.use('/cars', CarsRouter);
app.use('/user', UserRouter);
app.use('/', (req, res) => {
  res.redirect('/cars');
});
// 404 handle
app.use(error);

app.listen(port, async () => {
  logger.info(`server is running on http://localhost:${port}`);
  await connect();
});
