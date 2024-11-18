const express = require("express");
const authenticateJWT = require("./authenticateJWT");
const authorizeRole = require("./authorizeRole");

const router = express.Router();

router.get("/me", authenticateJWT, (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    role: req.user.role,
    message: "Here is your personal information",
  });
});

router.get("/admin", authenticateJWT, authorizeRole("admin"), (req, res) => {
  res.json({
    message: "Welcome, Admin! You have access to this resource.",
  });
});

module.exports = router;
