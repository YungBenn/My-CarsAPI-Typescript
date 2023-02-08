import { NextFunction, Request, Response } from 'express';

export function requireUser(req: Request, res: Response, next: NextFunction) {
  const user = res.locals.user;
  if (!user) {
    res.sendStatus(403).json({
      message: 'Login required',
    });
    return next();
  }
  return next();
}
