const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const authenticateJWT = require("./authenticateJWT");
const authorizeRole = require("./authorizeRole");
const users = require("./users");

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Проверка, существует ли уже пользователь с таким e-mail
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length + 1,
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    };

    users.push(newUser);
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
});

app.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);

    // Проверка пользователя и пароля bcrypt
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Генерация JWT токена
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

app.put("/update-email", authenticateJWT, (req, res) => {
  try {
    const { email } = req.body;
    const user = users.find((u) => u.id === req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.email = email;
    res.json({ message: "Email updated successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Update email failed", error: error.message });
  }
});

app.delete("/delete-account", authenticateJWT, (req, res) => {
  try {
    const index = users.findIndex((u) => u.id === req.user.id);

    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    users.splice(index, 1);
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Delete account failed", error: error.message });
  }
});

// Обновление роли пользователя (только администраторы)
app.put("/update-role", authenticateJWT, authorizeRole("admin"), (req, res) => {
  try {
    const { userId, newRole } = req.body;
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = newRole;
    res.json({ message: "Role updated successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Update role failed", error: error.message });
  }
});

// Маршрут /me для получения информации о текущем пользователи
app.get("/me", authenticateJWT, (req, res) => {
  const user = req.user;
  res.json({
    id: user.id,
    username: user.username,
    role: user.role,
    message: "Here is your personal information",
  });
});

// Обновление токена
app.post("/refresh-token", authenticateJWT, (req, res) => {
  try {
    const user = req.user;
    const newToken = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token: newToken });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Refresh token failed", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
