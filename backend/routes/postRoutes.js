const express = require("express");
const router = express.Router();

const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const auth = require("../middleware/authMiddleware");

// Create post (Protected)
router.post("/", auth, createPost);

// Get all posts
router.get("/", getPosts);

//  Get single post by ID
router.get("/:id", getPostById);

// Update post (Protected)
router.put("/:id", auth, updatePost);

// Delete post (Protected)
router.delete("/:id", auth, deletePost);

module.exports = router;
