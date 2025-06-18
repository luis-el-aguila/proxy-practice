// import express
// const express = require("express");
import { Request, Response, NextFunction } from 'express';

//middleware function
export const logRequest = (req: Request, res: Response, next: NextFunction) => {
  // original code
  // console.log(`Request to ${req.path} at ${new Date().toISOString()}`);
  // next();

  console.log(`Request to ${req.path} at ${new Date().toISOString()}`);
  next();
};
