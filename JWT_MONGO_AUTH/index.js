import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import studentRoutes from "./routes/students.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Подключение к MongoDB прошло успешно"))
  .catch((error) => console.error("Ошибка подключения к MongoDB:", error));

app.use("/students", studentRoutes);

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
