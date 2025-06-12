function logRequest(req, res, next) {
  console.log("Method:", req.method);
  console.log("Route:", req.originalUrl);
  console.log("Headers:", req.headers);
  console.log("Body", req.body);
  next(); // continue to the next middleware
}

module.exports = logRequest;
