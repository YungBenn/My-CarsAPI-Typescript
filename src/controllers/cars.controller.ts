import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger';
import { carModel } from '../models/cars.model';
import {
  addCarValidation,
  updateCarValidation,
} from '../middleware/cars.validation';
import {
  addCarToDB,
  deleteCarById,
  getCarById,
  updateCarById,
} from '../services/car.service';

// Add new car
export const addCar = async (req: Request, res: Response) => {
  req.body.car_id = uuidv4();
  const { value } = addCarValidation(req.body);
  try {
    await addCarToDB(value);
    logger.info('New car added');
    res.status(201).json({
      message: 'Success add new car',
    });
  } catch (err) {
    logger.error(err);
    res.status(422).json({
      message: 'Failed to add new car',
    });
  }
};

// get all cars
export const getAllCars = (req: Request, res: Response) => {
  carModel.find((err, cars) => {
    if (err) {
      logger.error(err);
    }
    res.json(cars);
  });
};

// get a car by id
export const getCar = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;

  try {
    const car = await getCarById(id);
    logger.info('here you go');
    res.status(200).json(car);
  } catch (error) {
    logger.error(error);
    res.status(422).json({
      message: 'Failed to get',
    });
  }
};

// update a car
export const updateCar = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;

  const { value } = updateCarValidation(req.body);
  try {
    await updateCarById(id, value);
    logger.info('car updated');
    res.status(200).json({
      message: 'Success update a car',
    });
  } catch (error) {
    logger.error(error);
    res.status(422).json({
      message: 'Failed to update',
    });
  }
};

// delete a car
export const deleteCar = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;

  try {
    await deleteCarById(id);
    logger.info('car deleted');
    res.status(200).json({
      message: 'Success delete a car',
    });
  } catch (err) {
    logger.error(err);
    res.status(404).json({
      message: 'Failed to delete',
    });
  }
};
