import { Router } from 'express';
import { createSession, refreshSession, registerUser } from '../controllers/auth.controller';

export const UserRouter: Router = Router();

UserRouter.post('/register', registerUser);
UserRouter.post('/login', createSession);
UserRouter.post('/refresh', refreshSession);
