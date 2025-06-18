import express, { Router } from 'express';
import { validateProxyToken } from '../middlewares/validateProxyToken';
import { logRequest } from '../middlewares/logRequest';
import { proxyPost } from '../controllers/proxyController';

//create router
const router = Router();

//applies the middleware only to this route
// router.post("/", logRequest, validateProxyToken, proxyPost);
router.post("/", logRequest, validateProxyToken, proxyPost);

//export the route
export default router;
