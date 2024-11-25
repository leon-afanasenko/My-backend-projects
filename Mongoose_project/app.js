const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { faker } = require("@faker-js/faker");
const User = require("./models/User");

dotenv.config();

const app = express();
app.use(express.json());

const dbURI = process.env.MONGO_URI;

if (!dbURI) {
  console.error("Ошибка: MONGO_URI не задан в .env файле");
  process.exit(1);
}

mongoose
  .connect(dbURI)
  .then(() => console.log("Успешное подключение к MongoDB Atlas"))
  .catch((err) => console.error("Ошибка подключения к MongoDB:", err));

app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    res.json({ message: "Пользователь удален" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/users/add-random", async (req, res) => {
  try {
    const users = [];

    for (let i = 0; i < 5; i++) {
      users.push({
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
    }

    const result = await User.insertMany(users);
    res.status(201).json({
      message: "Добавлено 5 случайных пользователей",
      users: result,
    });
  } catch (err) {
    console.error("Ошибка при добавлении пользователей:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
