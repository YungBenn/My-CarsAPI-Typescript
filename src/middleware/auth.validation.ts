import Joi from 'joi';
import IUser from '../types/user.type';

export function registerValidation(payload: IUser) {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    email: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(payload);
}

export function sessionValidation(payload: IUser) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(payload);
}

export function refreshSessionValidation(payload: IUser) {
  const schema = Joi.object({
    refreshToken: Joi.string().required(),
  });
  return schema.validate(payload);
}
