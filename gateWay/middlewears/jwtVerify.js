require("dotenv").config();
const jwt = require("jsonwebtoken");

const { JWT_ACCESS_SECRET_TOKEN } = process.env;
function verifyToken(req, res, next) {

  const token = req.headers["jwt-access-token"];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: Missing token",
    });
  }

  jwt.verify(token, JWT_ACCESS_SECRET_TOKEN, (err) => {
    if (err) {
   
      return res.status(403).json({
        message: "Forbidden: Invalid token",
      });
    }
    next();
  });
}

module.exports = verifyToken;
