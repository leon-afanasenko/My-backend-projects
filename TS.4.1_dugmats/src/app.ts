import express, { Application, Request, Response } from "express";
import authRoutes from "./routes/auth";
import postRoutes from "./routes/post";

const app: Application = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Сервер запущен!");
});

export default app;
