const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Регистрация пользователя
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (user) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword],
      (err) => {
        if (err) {
          return res.status(500).json({ error: "Database error." });
        }
        res.status(201).json({ message: "User registered successfully." });
      }
    );
  });
});

// Логин пользователя
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password." });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Login successful.", token });
  });
});

// Смена пароля
router.post("/change-password", verifyToken, async (req, res) => {
  const { newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({ error: "New password is required." });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  db.run(
    "UPDATE users SET password = ?, mustChangePassword = 0 WHERE id = ?",
    [hashedPassword, req.user.id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Database error." });
      }
      res.json({ message: "Password changed successfully." });
    }
  );
});

// Проверка  смены пароля
router.get("/check-password-change", verifyToken, (req, res) => {
  db.get(
    "SELECT mustChangePassword FROM users WHERE id = ?",
    [req.user.id],
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: "Database error." });
      }
      if (user.mustChangePassword) {
        return res.status(403).json({ message: "Password change required." });
      }
      res.json({ message: "No password change required." });
    }
  );
});

// Удаление аккаунта
router.post("/delete-account", verifyToken, async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Password is required." });
  }

  db.get(
    "SELECT * FROM users WHERE id = ?",
    [req.user.id],
    async (err, user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Incorrect password." });
      }

      db.run("DELETE FROM users WHERE id = ?", [req.user.id], (err) => {
        if (err) {
          return res.status(500).json({ error: "Database error." });
        }
        res.json({ message: "Account deleted successfully." });
      });
    }
  );
});

// Изменение email
router.post("/change-email", verifyToken, async (req, res) => {
  const { currentPassword, newEmail } = req.body;

  if (!currentPassword || !newEmail) {
    return res
      .status(400)
      .json({ error: "Current password and new email are required." });
  }

  db.get(
    "SELECT * FROM users WHERE id = ?",
    [req.user.id],
    async (err, user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Incorrect password." });
      }

      db.get(
        "SELECT * FROM users WHERE email = ?",
        [newEmail],
        (err, existingUser) => {
          if (existingUser) {
            return res.status(400).json({ error: "Email is already taken." });
          }

          db.run(
            "UPDATE users SET email = ? WHERE id = ?",
            [newEmail, req.user.id],
            (err) => {
              if (err) {
                return res.status(500).json({ error: "Database error." });
              }
              res.json({ message: "Email updated successfully." });
            }
          );
        }
      );
    }
  );
});

router.get("/protected-route", verifyToken, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

module.exports = router;
