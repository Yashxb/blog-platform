import { API } from "./api";

// Get all posts
export const getPosts = () => API.get("/posts");

// Create a new post
export const createPost = (data) => API.post("/posts", data);

// Get single post
export const getSinglePost = (id) => API.get(`/posts/${id}`);

// Update post
export const updatePost = (id, data) => API.put(`/posts/${id}`, data);

// Delete post
export const deletePost = (id) => API.delete(`/posts/${id}`);