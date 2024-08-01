const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authorization header missing or incorrect format",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      res.status(403).json({
        message: "Invalid token",
      });
    }
  } catch (error) {
    res.status(403).json({
      message: "Invalid or expired token",
    });
  }
}

module.exports = {
  authMiddleware,
};
