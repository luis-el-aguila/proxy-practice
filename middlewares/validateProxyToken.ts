import { Request, Response, NextFunction } from 'express';

interface ProxyRequest extends Request {
  headers: {
    'x-proxy-token': string;
  };
}

export const validateProxyToken = (req: ProxyRequest, res: Response, next: NextFunction) => {
  const token = req.headers['x-proxy-token'];
  if (!token) {
    return res.status(400).json({ error: 'falta el header x-proxy-token' });
  }
  next();
};
