import dotenv from 'dotenv';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

// Configurar dotenv
dotenv.config();

// Inicializar Firebase
let db: admin.firestore.Firestore | null = null;
let app: admin.app.App | null = null;

try {
  if (!process.env.FIREBASE_KEY_PATH) {
    throw new Error('FIREBASE_KEY_PATH environment variable is required');
  }

  const keyPath = join(process.cwd(), process.env.FIREBASE_KEY_PATH);
  if (!existsSync(keyPath)) {
    throw new Error(`Service account key file not found at ${keyPath}`);
  }

  const serviceAccount = JSON.parse(readFileSync(keyPath, 'utf8')) as ServiceAccount;
  
  if (!serviceAccount.projectId || !serviceAccount.privateKey || !serviceAccount.clientEmail) {
    throw new Error('Service account credentials are invalid');
  }

  // Verificar si ya existe una aplicación inicializada
  const existingApps = admin.apps;
  if (existingApps.length === 0) {
    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    app = existingApps[0];
  }

  if (!app) {
    throw new Error('Failed to initialize Firebase app');
  }

  // Inicializar Firestore
  db = admin.firestore(app);

  if (!db) {
    throw new Error('Failed to initialize Firestore');
  }

  // Verificar conexión
  try {
    await db.collection('test').get();
    console.log('Conexión a Firebase exitosa');
  } catch (error) {
    console.error('Error al verificar conexión con Firebase:', error);
    throw error;
  }}

// Exportar la base de datos y la aplicación
export { db, app };
