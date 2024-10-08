import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateLogin = [
  body('email').isEmail().withMessage('Email is required and must be valid'),
  body('password').notEmpty().withMessage('Password is required'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
