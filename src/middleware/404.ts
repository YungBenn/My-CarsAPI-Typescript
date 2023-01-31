import { Request, Response } from 'express';

export const error = (req: Request, res: Response) => {
  res.status(404).json({
    status: '404',
    message: 'This page does not exist',
  });
};
