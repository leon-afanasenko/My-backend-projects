import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Привет! Это GET-запрос.");
});

app.post("/data", (req: Request, res: Response) => {
  const { name, age }: { name: string; age: number } = req.body;
  res.json({ message: `Привет, ${name}. Тебе ${age} лет!` });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Сервер работает на http://localhost:${port}`);
  });
}

export { app };
