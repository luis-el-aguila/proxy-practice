import dotenv from 'dotenv';
import * as admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { ServiceAccount } from 'firebase-admin';

dotenv.config();

if (!process.env.FIREBASE_KEY_PATH) {
  throw new Error('FIREBASE_KEY_PATH environment variable is required');
}

const serviceAccount = require(process.env.FIREBASE_KEY_PATH) as ServiceAccount;

initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

export default db;
