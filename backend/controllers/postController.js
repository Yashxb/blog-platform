const Post = require("../models/Post");

// CREATE POST
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = new Post({
      title,
      content,
      author: req.user.id,
    });

    await post.save();

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating post" });
  }
};

// GET ALL POSTS
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

// UPDATE POST
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "You cannot edit this post" });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating post" });
  }
};

// DELETE POST
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "You cannot delete this post" });
    }

    await post.deleteOne();

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting post" });
  }
};
