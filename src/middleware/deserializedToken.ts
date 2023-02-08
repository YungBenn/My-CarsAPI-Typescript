import { NextFunction, Request, Response } from 'express';
import { verifyJWT } from '../utils/jwt';

async function deserializedToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const accessToken = req.headers.authorization?.replace(/^Bearer\s/, '');
  if (!accessToken) {
    return next();
  }
  const token: any = verifyJWT(<string>accessToken);
  if (token.decoded) {
    res.locals.user = token.decoded;
    return next();
  }
  if (token.expired) {
    return next();
  }
  return next();
}

export default deserializedToken;
