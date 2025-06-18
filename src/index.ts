//load the environment variables
// require("dotenv").config();
import dotenv from 'dotenv';
dotenv.config();

//imports of the app
// const express = require("express");
import express from 'express';
const app = express();

//middleware global , parse json
// app.use(express.json());
app.use(express.json());

//router import
// const proxyRouter = require("./routes/proxy");
import proxyRouter from './routes/proxy';

// use the router in the route /proxy
// app.use("/proxy", proxyRouter);
app.use("/proxy", proxyRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`servidor listening on port ${PORT}`);
});
