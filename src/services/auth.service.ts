import { userModel } from '../models/user.model';
import IUser from '../types/user.type';

export async function createUser(payload: IUser) {
  return await userModel.create(payload);
}

export async function findUserByEmail(email: string) {
  return await userModel.findOne({ email });
}
