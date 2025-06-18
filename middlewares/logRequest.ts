import { Request, Response, NextFunction } from 'express';

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
  console.log('Method:', req.method);
  console.log('Route:', req.originalUrl);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
};
