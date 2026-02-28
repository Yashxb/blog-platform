import { useState } from "react";
import { createPost } from "../services/postService";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const [form, setForm] = useState({
    title: "",
    content: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      await createPost(form);
      navigate("/");
    } catch (error) {
      console.error("Post creation failed", error);
      alert("Failed to publish post");
    }
  };

  return (
    <div className="main-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create New Post</h2>

        <input
          type="text"
          placeholder="Post Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <textarea
          rows="6"
          placeholder="Write your content here..."
          value={form.content}
          onChange={(e) =>
            setForm({ ...form, content: e.target.value })
          }
        />

        <button type="submit" className="btn-primary">
          Publish Post
        </button>
      </form>
    </div>
  );
};

export default NewPost;