import { Request, Response } from "express";
import Post, { IPost } from "../models/Post";

// Получить все посты
export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error });
  }
};

// Создать новый пост
export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, content } = req.body;

    const newPost: IPost = new Post({ title, content });
    await newPost.save();

    res.status(201).json({ message: "Пост успешно создан", post: newPost });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error });
  }
};

// Обновить пост
export const updatePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedPost) {
      res.status(404).json({ message: "Пост не найден" });
      return;
    }

    res.json({ message: "Пост обновлён", post: updatedPost });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error });
  }
};

// Удалить пост
export const deletePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      res.status(404).json({ message: "Пост не найден" });
      return;
    }

    res.json({ message: "Пост удалён" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error });
  }
};
