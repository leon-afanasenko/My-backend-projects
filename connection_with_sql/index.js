import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Произошла внутренняя ошибка сервера.");
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
