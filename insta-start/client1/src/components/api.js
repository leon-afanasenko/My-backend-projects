import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

export const fetchPosts = () => API.get("/posts");
export const createPost = (postData) => API.post("/posts", postData);
