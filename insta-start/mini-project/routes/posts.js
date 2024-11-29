import express from "express";
import authenticateToken from "../middleware/authMiddleware.js";
import { getDB } from "../db/index.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const db = getDB();
    const newPost = {
      title,
      content,
      author: req.user.username,
      createdAt: new Date(),
    };

    const result = await db.collection("posts").insertOne(newPost);

    res.status(201).json({
      message: "Post created successfully",
      postId: result.insertedId,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const db = getDB();
    const posts = await db
      .collection("posts")
      .find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .toArray();

    const totalPosts = await db.collection("posts").countDocuments();

    res.json({
      posts,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title && !content) {
    return res
      .status(400)
      .json({ message: "At least one field (title or content) is required" });
  }

  try {
    const db = getDB();
    const post = await db
      .collection("posts")
      .findOne({ _id: new ObjectId(id) });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author !== req.user.username) {
      return res
        .status(403)
        .json({ message: "You can only edit your own posts" });
    }

    const updatedPost = {};
    if (title) updatedPost.title = title;
    if (content) updatedPost.content = content;

    await db
      .collection("posts")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedPost });

    res.json({ message: "Post updated successfully" });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const db = getDB();
    const post = await db
      .collection("posts")
      .findOne({ _id: new ObjectId(id) });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author !== req.user.username) {
      return res
        .status(403)
        .json({ message: "You can only delete your own posts" });
    }

    await db.collection("posts").deleteOne({ _id: new ObjectId(id) });

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
