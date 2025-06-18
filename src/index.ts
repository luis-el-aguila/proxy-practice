import dotenv from 'dotenv';
import express from 'express';
import { AddressInfo, Server } from 'net';
import { ErrorRequestHandler } from 'express';

dotenv.config();

const app = express();

// Middleware global para parsear JSON
app.use(express.json());

// Importar y usar el router
import proxyRouter from './routes/proxy';
app.use("/proxy", proxyRouter);

// Middleware de manejo de errores
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;

const server: Server = app.listen(PORT, () => {
  const address = server.address() as AddressInfo;
  if (!address) {
    throw new Error('Failed to bind to address');
  }
  console.log(`Servidor escuchando en http://localhost:${address.port}`);
});

// Manejo de errores de proceso
process.on('uncaughtException', (error: Error) => {
  console.error('Error no capturado:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown) => {
  console.error('Rechazo no manejado:', reason);
  process.exit(1);
});
