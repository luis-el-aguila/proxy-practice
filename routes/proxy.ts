import express, { Router } from 'express';
import { validateProxyToken } from '../middlewares/validateProxyToken';
import { logRequest } from '../middlewares/logRequest';
import { proxyPost } from '../controllers/proxyController';

const router: Router = express.Router();

router.post("/", logRequest, validateProxyToken, proxyPost);

export default router;
