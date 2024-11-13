import { User, Post } from "./models/index.js";

(async () => {
  try {
    const user = await User.findOne({ where: { id: 1 } });
    const post = await Post.findOne({ where: { id: 2 } });

    await user.addLikedPosts(post, { through: { likedAt: new Date() } });
    console.log("Пользователь лайкнул пост!");

    const likedPosts = await user.getLikedPosts();
    console.log(
      "Лайкнутые посты:",
      likedPosts.map((post) => post.toJSON())
    );

    const likers = await post.getLikers();
    console.log(
      "Пользователи, лайкнувшие пост:",
      likers.map((user) => user.toJSON())
    );
  } catch (error) {
    console.error("Ошибка:", error);
  }
})();
