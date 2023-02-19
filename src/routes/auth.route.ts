import { Router } from 'express';
import * as authController from '../controllers/auth.controller';

export const UserRouter: Router = Router();

UserRouter.post('/register', authController.registerUser);
UserRouter.post('/login', authController.createSession);
UserRouter.post('/refresh', authController.refreshSession);
