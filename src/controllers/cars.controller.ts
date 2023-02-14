import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger';
import { carModel } from '../models/car.model';
import {
  addCarValidation,
  updateCarValidation,
} from '../middleware/car.validation';
import {
  addCarToDB,
  deleteCarById,
  getCarById,
  updateCarById,
} from '../services/car.service';

// Add new car
export async function addCar(req: Request, res: Response) {
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
}

// get all cars
export async function getAllCars(req: Request, res: Response) {
  const query = req.query;
  carModel.find(query, (err: any, data: any) => {
    if (err) {
      logger.error('error');
    } else {
      logger.info('Success to get data');
      res.status(200).json({
        status: 200,
        data: data,
      });
    }
  });
}

// get a car by id
export async function getCar(req: Request, res: Response) {
  const {
    params: { id },
  } = req;

  try {
    const car = await getCarById(id);
    if (!car) {
      logger.error('Your car id is wrong');
      res.status(200).json({
        status: 200,
        message: 'Your car id is wrong',
        data: car,
      });
    } else {
      logger.info('Success to get a car');
      res.status(200).json({
        status: 200,
        message: 'Data found',
        data: car,
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(404).json({
      message: 'Failed to get',
    });
  }
}

// update a car
export async function updateCar(req: Request, res: Response) {
  const {
    params: { id },
  } = req;

  const { error, value } = updateCarValidation(req.body);
  if (error) {
    logger.error(error);
    res.status(442).json({
      message: 'Failed to update',
    });
  } else {
    await updateCarById(id, value);
    logger.info('car updated');
    res.status(200).json({
      message: 'Success update a car',
    });
  }
}

// delete a car
export async function deleteCar(req: Request, res: Response) {
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
}

function textRegex(text: any) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
