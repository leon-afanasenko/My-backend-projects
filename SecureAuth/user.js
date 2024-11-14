const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");
const router = express.Router();

router.post("/delete-account", async (req, res) => {
  const { userId, password } = req.body;

  db.get("SELECT * FROM users WHERE id = ?", [userId], async (err, user) => {
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password." });
    }

    db.run("DELETE FROM users WHERE id = ?", [userId], (err) => {
      if (err) {
        return res.status(500).json({ error: "Database error." });
      }
      res.json({ message: "Account deleted successfully." });
    });
  });
});

module.exports = router;
