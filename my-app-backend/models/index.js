import User from "./user.js";
import Post from "./post.js";

// one-to-one
// User.hasOne(Post, { foreignKey: "userId", as: "post" });
// Post.belongsTo(User, { foreignKey: "userId", as: "user" });

// one-to-many
// User.hasMany(Post, { foreignKey: "userId", as: "post" });
// Post.belongsTo(User, { foreignKey: "userId", as: "user" });

// many-to-many
User.belongsToMany(Post, {
  through: "UserPosts",
  as: "posts",
  foreignKey: "userId",
});

Post.belongsToMany(User, {
  through: "UserPosts",
  as: "users",
  foreignKey: "postId",
});

export { User, Post };
