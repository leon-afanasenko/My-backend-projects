import { Request, Response } from "express";
import User, { IUser } from "../models/User";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Проверка существующего пользователя
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Пользователь уже существует" });
      return;
    }

    // Создание нового пользователя
    const newUser: IUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "Регистрация успешна" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error });
  }
};
