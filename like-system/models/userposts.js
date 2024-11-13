import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.js";
import Post from "./post.js";

const UserPosts = sequelize.define(
  "UserPosts",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "posts",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    likedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "UserPosts",
    timestamps: false,
  }
);

export default UserPosts;
