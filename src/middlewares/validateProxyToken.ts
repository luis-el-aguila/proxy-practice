// import express
// const express = require("express");
import { Request, Response, NextFunction } from 'express';

//middleware function
export const validateProxyToken = (req: Request, res: Response, next: NextFunction) => {
  // original code
  // const token = req.headers['x-proxy-token'];
  // if (!token) {
  //   return res.status(401).json({ error: 'Token de proxy requerido' });
  // }
  // next();

  const token = req.headers['x-proxy-token'] as string | undefined;
  if (!token) {
    return res.status(401).json({ error: 'Token de proxy requerido' });
  }
  next();
};
