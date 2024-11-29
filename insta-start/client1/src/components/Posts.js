import React, { useEffect, useState } from "react";
import { fetchPosts } from "./api";

import "./Posts.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetchPosts();
        setPosts(response.data.posts || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    loadPosts();
  }, []);

  return (
    <div className="feed">
      {posts.map((post) => (
        <div className="post-card" key={post._id}>
          <div className="post-header">
            <img
              src="https://img.freepik.com/premium-photo/magic-messi-ai-generative_973959-494.jpg"
              alt="Messi"
              className="post-avatar"
            />
            <h3>{post.author}</h3>
          </div>
          <div className="post-content">
            <h4>{post.title}</h4>
            <p>{post.content}</p>
          </div>
          <div className="post-footer">
            <button>Like</button>
            <button>Comment</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
