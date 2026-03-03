import { API } from "./api";

// Get all posts
export const getPosts = async () => {
  const res = await API.get("/posts");
  return res.data; // return only data
};

// Create a new post
export const createPost = async (data) => {
  const res = await API.post("/posts", data);
  return res.data;
};

// Get single post by ID
export const getSinglePost = async (id) => {
  const res = await API.get(`/posts/${id}`);
  return res.data;
};

// Update post by ID
export const updatePost = async (id, data) => {
  const res = await API.put(`/posts/${id}`, data);
  return res.data;
};

// Delete post by ID
export const deletePost = async (id) => {
  const res = await API.delete(`/posts/${id}`);
  return res.data;
};;
