const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const users = [];

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const { email, password, role } = req.body;

  // Проверка, существует ли пользователь с таким e-mail
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Создаём нового пользователя
  const newUser = {
    id: users.length + 1,
    email,
    password,
    role: role || "user",
  };

  users.push(newUser);
  res
    .status(201)
    .json({ message: "User registered successfully", user: newUser });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Ищем пользователя по e-mail и паролю
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Генерация токена
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

// Middleware для проверки JWT
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

// Middleware для проверки роли
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role === role) {
      next();
    } else {
      res
        .status(403)
        .json({
          message: "Forbidden: You do not have access to this resource",
        });
    }
  };
};

// Защищённый маршрут /me
app.get("/me", authenticateJWT, (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    role: req.user.role,
    message: "Here is your personal information",
  });
});

// Защищённый маршрут /admin, доступный только администраторам
app.get("/admin", authenticateJWT, authorizeRole("admin"), (req, res) => {
  res.json({
    message: "Welcome, Admin! You have access to this resource.",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
