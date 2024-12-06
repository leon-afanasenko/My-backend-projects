import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import cartRoutes from "./routes/cartRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use(cartRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
