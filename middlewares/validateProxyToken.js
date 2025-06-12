//validate  if exisst the header
function validateProxyToken(req, res, next) {
  const token = req.headers["x-proxy-token"];
  if (!token) {
    return res.status(400).json({ error: "falta el header x-proxy-token" });
  }
  next(); //if header exisst, then continue...
}

module.exports = validateProxyToken;
