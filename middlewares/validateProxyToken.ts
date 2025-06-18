import { Request, Response, NextFunction } from 'express';

export const validateProxyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-proxy-token'];
  if (!token) {
    return res.status(400).json({ error: 'falta el header x-proxy-token' });
  }
  next();
};
