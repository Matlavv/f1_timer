import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
  user?: string | jwt.JwtPayload;
}

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

export const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  console.log('authMiddleware hit');
  console.log('Authorization header:', authHeader);

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    console.log('Token extracted:', token);

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
      if (err) {
        console.log('Token verification failed:', err);
        return res.status(403).json({
          message: 'Token verification failed',
          error: err.message,
        });
      }
      req.user = user;
      console.log('Token verified successfully:', user);
      next();
    });
  } else {
    console.log('No Authorization header');
    res.status(401).json({ message: 'No Authorization header provided' });
  }
};
