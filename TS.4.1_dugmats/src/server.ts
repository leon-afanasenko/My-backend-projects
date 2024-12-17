import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Подключение к MongoDB успешно");
    app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
  })
  .catch((err) => console.error("Ошибка подключения к MongoDB:", err));
