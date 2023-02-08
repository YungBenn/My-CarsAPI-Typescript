import { Schema, model } from 'mongoose';
import ICar from '../types/car.type';

const carSchema = new Schema<ICar>(
  {
    car_id: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true },
);

export const carModel = model<ICar>('Car', carSchema);
