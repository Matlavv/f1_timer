import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const dbCheckMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (mongoose.connection.readyState !== 1) {
    res.status(500).json({ message: 'Database not connected' });
  } else {
    next();
  }
};
