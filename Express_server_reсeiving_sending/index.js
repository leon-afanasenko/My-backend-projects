import express from "express";
import cors from "cors";
import "dotenv/config";
import fs from "fs";

const app = express();
const port = process.env.PORT || 3000; // Используем порт из .env

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

app.get("/users", (req, res) => {
  res.send("List of users");
});

app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.send(`User ID: ${user.id}, Name: ${user.name}`);
});

app.post("/submit", (req, res) => {
  const { email, phone } = req.body;

  // Запись данных в текстовый файл
  const data = `Email: ${email}, Phone: ${phone}\n`;
  fs.appendFile("registrations.txt", data, (err) => {
    if (err) {
      console.error("Error writing to file", err);
      return res.status(500).send("Error saving data");
    }

    console.log(`Email: ${email}, Phone: ${phone}`);
    res.send(`Received Email: ${email}, Phone: ${phone}`);
  });
});

// Middleware для ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`Server started at http://127.0.0.1:${port}`);
});
