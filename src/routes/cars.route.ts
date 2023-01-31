import { Router } from 'express';
import {
  addCar,
  deleteCar,
  getAllCars,
  getCar,
  updateCar,
} from '../controllers/cars.controller';

export const CarsRouter: Router = Router();

CarsRouter.get('/', getAllCars);
CarsRouter.get('/:id', getCar);
CarsRouter.post('/', addCar);
CarsRouter.put('/:id', updateCar);
CarsRouter.delete('/:id', deleteCar);
