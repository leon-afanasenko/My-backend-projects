import User from "./user.js";
import Post from "./post.js";
import UserPosts from "./userposts.js";

User.belongsToMany(Post, {
  through: UserPosts,
  as: "likedPosts",
  foreignKey: "userId",
});

Post.belongsToMany(User, {
  through: UserPosts,
  as: "likers",
  foreignKey: "postId",
});

export { User, Post, UserPosts };
