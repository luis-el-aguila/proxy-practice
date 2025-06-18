import express, { Router, Request, Response, NextFunction } from 'express';
import { validateProxyToken } from '../middlewares/validateProxyToken';
import { logRequest } from '../middlewares/logRequest';
import { proxyPost } from '../controllers/proxyController';

const router: Router = Router();

// Manejo de errores para la ruta
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error en ruta proxy:', err);
  res.status(500).json({ error: 'Error en la ruta proxy' });
});

// Ruta principal
router.post("/", logRequest, validateProxyToken, proxyPost);

export default router;
