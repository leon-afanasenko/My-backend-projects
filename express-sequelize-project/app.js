import express from "express";
import sequelize from "./config/db.js";
import Book from "./models/book.js";

const app = express();
app.use(express.json());

sequelize
  .authenticate()
  .then(() => {
    console.log("Соединение с базой данных установлено.");
  })
  .catch((error) => {
    console.error("Ошибка подключения:", error);
  });

app.get("/books", async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

app.post("/books", async (req, res) => {
  const { title, author, year } = req.body;
  const newBook = await Book.create({ title, author, year });
  res.json(newBook);
});

app.put("/books/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, year } = req.body;
  await Book.update({ title, author, year }, { where: { id } });
  res.json({ message: "Книга обновлена" });
});

app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;
  await Book.destroy({ where: { id } });
  res.json({ message: "Книга удалена" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
