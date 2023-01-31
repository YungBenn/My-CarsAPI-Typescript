import { Request, Response } from 'express';
import { carModel } from '../models/cars.model';
import ICar from '../types/cars.type';
import { logger } from '../utils/logger';

export const addCarToDB = async (payload: ICar) => {
  await carModel.create(payload);
};

export const updateCarById = async (id: String, payload: ICar) => {
  await carModel.findOneAndUpdate(
    {
      car_id: id,
    },
    { $set: payload },
  );
};

export const deleteCarById = async (id: String) => {
  await carModel.findOneAndDelete({
    car_id: id,
  });
};

export const getCarById = async (id: String) => {
  return await carModel.findOne({ car_id: id });
};
