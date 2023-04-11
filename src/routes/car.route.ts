import { Router } from 'express';
import * as carsController from '../controllers/cars.controller';
import { requireUser } from '../middleware/auth';

const CarsRouter: Router = Router();

CarsRouter.get('/', carsController.getAllCars);
CarsRouter.get('/:id', carsController.getCar);
CarsRouter.post('/', requireUser, carsController.addCar);
CarsRouter.put('/:id', requireUser, carsController.updateCar);
CarsRouter.delete('/:id', requireUser, carsController.deleteCar);

export default CarsRouter;
