import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes";
import logger from "./middleware/logger";

dotenv.config();

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;
const API_URL = `${BASE_URL}/api/tasks`;

const app: Application = express();

// Middleware
app.use(logger);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log("Server running at:", BASE_URL);
  console.log("API endpoint:", API_URL);
});
