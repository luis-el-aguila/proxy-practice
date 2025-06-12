//import axios
const axios = require("axios");
//import db database firestore
const db = require("../firebase");

async function proxyPost(req, res) {
  const body = req.body;
  const { host, "content-length": contentLength, ...safeHeaders } = req.headers;
  let log = {
    headers: safeHeaders,
    body,
    timestamp: new Date(),
  };

  try {
    const response = await axios.post("https://postman-echo.com/post", body, {
      headers: safeHeaders,
    });
    log.result = response.data;
    //save in firebase the log
    await db.collection("logs").add(log);
    res.status(response.status).json(response.data);
  } catch (error) {
    log.result = { error: "conection error width the external API" };
    // save in firestore width error
    await db.collection("logs").add(log);
    res.status(502).json(log.result);
  }
}

module.exports = proxyPost;
