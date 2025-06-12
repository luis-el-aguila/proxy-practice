// import express
const express = require("express");
//import middlewares
const validateProxyToken = require("../middlewares/validateProxyToken");
const logRequest = require("../middlewares/logRequest");
// import controller
const proxyPost = require("../controllers/proxyController");

//create router
const router = express.Router();

//applies the middleware only to this route
router.post("/", logRequest, validateProxyToken, proxyPost);

//export the route
module.exports = router;
