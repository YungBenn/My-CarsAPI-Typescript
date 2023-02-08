import { Router } from 'express';
import {
  addCar,
  deleteCar,
  getAllCars,
  getCar,
  updateCar,
} from '../controllers/cars.controller';
import { requireUser } from '../middleware/auth';

export const CarsRouter: Router = Router();

CarsRouter.get('/', getAllCars);
CarsRouter.get('/:id', getCar);
CarsRouter.post('/', requireUser, addCar);
CarsRouter.put('/:id', requireUser, updateCar);
CarsRouter.delete('/:id', requireUser, deleteCar);
