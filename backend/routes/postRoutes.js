const express = require("express");
const {
  createPost,
  getPosts,
  getMyPosts
} = require("../controllers/postController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getPosts);
router.post("/", protect, createPost);
router.get("/my", protect, getMyPosts);

module.exports = router;