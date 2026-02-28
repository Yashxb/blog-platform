const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  const { title, content } = req.body;

  const post = await Post.create({
    title,
    content,
    author: req.user.id
  });

  res.status(201).json(post);
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find()
    .populate("author", "name email")
    .sort({ createdAt: -1 });

  res.json(posts);
};

exports.getMyPosts = async (req, res) => {
  const posts = await Post.find({
    author: req.user.id
  }).sort({ createdAt: -1 });

  res.json(posts);
};