import { Request, Response } from "express";
import { Task } from "../models/Task";

let tasks: Task[] = [];

export const getTasks = (req: Request, res: Response): void => {
  res.json(tasks);
};

export const createTask = (req: Request, res: Response): void => {
  const newTask: Task = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};
