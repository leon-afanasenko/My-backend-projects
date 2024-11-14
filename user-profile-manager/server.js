import express from "express";
import "dotenv/config";
import cors from "cors";
import bcrypt from "bcrypt";
import User from "./models/User.js";

const app = express();
app.use(cors());
app.use(express.json());

// Middleware для симуляции залогиненного пользователя
app.use((req, res, next) => {
  req.user = { id: 1 }; // Симуляция пользователя с ID 1
  next();
});

app.get("/", (req, res) => {
  res.send(`
      <h1>Добро пожаловать в API управления профилем</h1>
      <p>Используйте следующие ссылки для тестирования API:</p>
      <ul>
        <li><a href="http://localhost:3000/register" target="_blank">Регистрация (POST-запрос, использовать Postman или fetch)</a></li>
        <li><a href="http://localhost:3000/profile/1" target="_blank">Просмотр профиля (GET /profile/:id)</a></li>
        <li><a href="http://localhost:3000/profile/1" target="_blank">Обновление профиля (PUT /profile/:id, использовать Postman или fetch)</a></li>
      </ul>
      <p>Для регистрации используйте POST-запрос на <strong>/register</strong> с телом запроса:</p>
      <pre>
  {
    "username": "Leon",
    "password": "mySecretPassword",
    "email": "leon@example.com",
    "name": "Leon"
  }
      </pre>
      <p>Для просмотра профиля перейдите по ссылке <strong>/profile/1</strong>.</p>
      <p>Для обновления профиля используйте PUT-запрос на <strong>/profile/1</strong> с телом запроса:</p>
      <pre>
  {
    "email": "newemail@example.com",
    "name": "New Name"
  }
      </pre>
    `);
});

app.post("/register", async (req, res) => {
  const { username, password, email, name } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Введите имя пользователя и пароль" });
  }

  try {
    const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      name,
    });

    res.status(201).json({
      message: "Пользователь успешно зарегистрирован",
      user: { username: newUser.username },
    });
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.get("/profile/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  if (req.user.id !== userId) {
    return res.status(403).json({ error: "Доступ запрещен" });
  }

  try {
    const user = await User.findByPk(userId, {
      attributes: ["username", "email", "name"],
    });

    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    res.json(user);
  } catch (error) {
    console.error("Ошибка при получении профиля:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.put("/profile/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const { email, name } = req.body;

  if (req.user.id !== userId) {
    return res.status(403).json({ error: "Доступ запрещен" });
  }

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    user.email = email || user.email;
    user.name = name || user.name;
    await user.save();

    res.json({ message: "Профиль успешно обновлен", user });
  } catch (error) {
    console.error("Ошибка при обновлении профиля:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`PORT: ${process.env.PORT}`);
  console.log(`SALT_ROUNDS: ${process.env.SALT_ROUNDS}`);
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
