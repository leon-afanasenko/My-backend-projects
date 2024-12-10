import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/index.js";
import transactionsRoutes from "./routes/transactions.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/transactions", transactionsRoutes);

app.get("/", (req, res) => {
  res.send("Добро пожаловать в приложение для отслеживания финансов!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
