import { carModel } from '../models/car.model';
import ICar from '../types/cars.type';

export async function addCarToDB(payload: ICar) {
  await carModel.create(payload);
}

export async function updateCarById(id: String, payload: ICar) {
  await carModel.findOneAndUpdate(
    {
      car_id: id,
    },
    { $set: payload },
  );
}

export async function deleteCarById(id: String) {
  await carModel.findOneAndDelete({
    car_id: id,
  });
}

export async function getCarById(id: String) {
  return await carModel.findOne({ car_id: id });
}
