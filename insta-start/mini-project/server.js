import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/index.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
