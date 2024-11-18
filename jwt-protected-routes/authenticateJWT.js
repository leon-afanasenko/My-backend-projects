const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Invalid token", error: err.message });
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "Authorization header missing" });
  }
};

module.exports = authenticateJWT;
