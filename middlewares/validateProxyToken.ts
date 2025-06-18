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
  
  if (typeof token !== 'string') {
    return res.status(400).json({ error: 'El token debe ser una cadena de texto' });
  }
  
  if (token.length < 10) {
    return res.status(400).json({ error: 'El token es demasiado corto' });
  }
  
  next();
};
