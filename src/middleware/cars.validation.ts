import Joi from 'joi';
import ICar from '../types/cars.type';

export const addCarValidation = (payload: ICar) => {
  const schema = Joi.object({
    car_id: Joi.string().required(),
    name: Joi.string().required(),
    brand: Joi.string().required(),
    color: Joi.string().allow('', null),
    price: Joi.string().allow('', null),
  });
  return schema.validate(payload);
};

export const updateCarValidation = (payload: ICar) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    brand: Joi.string().allow('', null),
    color: Joi.string().allow('', null),
    price: Joi.string().allow('', null),
  });
  return schema.validate(payload);
};
