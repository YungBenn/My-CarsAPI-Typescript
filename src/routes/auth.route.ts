import { Router } from 'express';
import * as authController from '../controllers/auth.controller';

const UserRouter: Router = Router();

UserRouter.post('/register', authController.registerUser);
UserRouter.post('/login', authController.createSession);
UserRouter.post('/refresh', authController.refreshSession);

export default UserRouter;
