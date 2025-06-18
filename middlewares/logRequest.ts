import { Request, Response, NextFunction } from 'express';

interface LoggableRequest extends Request {
  body: Record<string, unknown>;
}

export const logRequest = (req: LoggableRequest, res: Response, next: NextFunction) => {
  try {
    console.log('Method:', req.method);
    console.log('Route:', req.originalUrl);
    
    // Loguear headers relevantes
    const headersToLog: Record<string, string | undefined> = {
      'Content-Type': req.headers['content-type'],
      'Authorization': req.headers['authorization'],
      'User-Agent': req.headers['user-agent']
    };
    console.log('Headers:', headersToLog);
    
    // Loguear body si existe
    if (req.body) {
      console.log('Body:', JSON.stringify(req.body, null, 2));
    }
    
    next();
  } catch (error) {
    console.error('Error en logging:', error);
    next();
  }
};
