import { useState, useContext } from "react";
import { API } from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NewPost = () => {
  const [form, setForm] = useState({ title: "", content: "" });
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      // Token automatically added by interceptor
      await API.post("/posts", form);

      alert("✅ Post created successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error creating post:", err.response || err);
      alert("Failed to create post. Check console.");
    }
  };

  if (!user) {
    return (
      <div className="main-container">
        <h2>Please login to create a post.</h2>
      </div>
    );
  }

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
