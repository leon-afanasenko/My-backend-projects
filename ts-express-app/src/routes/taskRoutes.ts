import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/tasks", (req: Request, res: Response) => {
  res.json([]);
});

router.post("/tasks", (req: Request, res: Response) => {
  res.status(201).json({ message: "Task created" });
});

router.put("/tasks/:id", (req: Request, res: Response) => {
  const taskId = req.params.id;
  res.json({ message: `Task ${taskId} updated` });
});

router.delete("/tasks/:id", (req: Request, res: Response) => {
  const taskId = req.params.id;
  res.json({ message: `Task ${taskId} deleted` });
});

export default router;
