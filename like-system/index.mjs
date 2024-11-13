import express from "express";
import { User, Post } from "./models/index.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

async function addLike(userId, postId) {
  try {
    const user = await User.findOne({ where: { id: userId } });
    const post = await Post.findOne({ where: { id: postId } });

    if (!user || !post) {
      console.log("Пользователь или пост не найден!");
      return;
    }

    await user.addLikedPosts(post, {
      through: { likedAt: new Date() },
    });

    console.log("Пользователь лайкнул пост!");
  } catch (error) {
    console.error("Ошибка при добавлении лайка:", error);
  }
}

app.post("/like", async (req, res) => {
  const { userId, postId } = req.body;

  if (!userId || !postId) {
    return res.status(400).json({ error: "Не указан userId или postId" });
  }

  try {
    await addLike(userId, postId);
    return res.status(200).json({ message: "Лайк успешно добавлен" });
  } catch (error) {
    return res.status(500).json({ error: "Ошибка при добавлении лайка" });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
