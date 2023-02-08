import { Schema, model } from 'mongoose';
import IUser from '../types/user.type';

const userSchema = new Schema<IUser>(
  {
    user_id: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const userModel = model<IUser>('User', userSchema);
