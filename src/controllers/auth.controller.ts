import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger';
import { checkPassword, hashing } from '../utils/hashing';
import { createUser, findUserByEmail } from '../services/auth.service';
import { signJWT, verifyJWT } from '../utils/jwt';
import {
  refreshSessionValidation,
  registerValidation,
  sessionValidation,
} from '../middleware/auth.validation';

export async function registerUser(req: Request, res: Response) {
  req.body.user_id = uuidv4();
  const { value } = registerValidation(req.body);
  try {
    value.password = hashing(value.password);
    await createUser(value);
    logger.info('New user added');
    res.status(201).json({
      message: 'Success register user',
    });
  } catch (err) {
    logger.error(err);
    res.status(422).json({
      message: 'Failed to register',
    });
  }
}

export async function createSession(req: Request, res: Response) {
  const { value } = sessionValidation(req.body);
  try {
    const user: any = await findUserByEmail(value.email);
    const isValid = checkPassword(value.password, user.password);
    if (!isValid) {
      logger.error('Invalid email or password');
      res.status(404).json({
        message: 'Invalid email or password',
      });
    }
    const accessToken = signJWT({ ...user }, { expiresIn: '1h' });
    const refreshToken = signJWT({ ...user }, { expiresIn: '1d' });
    return res.status(200).send({
      message: 'Success register user',
      data: { accessToken, refreshToken },
    });
  } catch (err) {
    logger.error(err);
    res.status(422).json({
      message: 'Failed to login',
    });
  }
}

export async function refreshSession(req: Request, res: Response) {
  const { value } = refreshSessionValidation(req.body);
  try {
    const { decoded } = verifyJWT(value.refreshToken);
    const user = await findUserByEmail(decoded._doc.email);
    if (!user) {
      return false;
    }
    const accessToken = signJWT(
      {
        ...user,
      },
      { expiresIn: '1d' },
    );
    return res.status(200).send({
      message: 'Refresh session success ',
      data: { accessToken },
    });
  } catch (err: any) {
    logger.error(err);
    res.status(422).json({
      message: 'Failed to refresh session',
    });
  }
}
