import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../services/postService";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="main-container"><p>Loading post...</p></div>;
  }

  if (!post) {
    return <div className="main-container"><p>Post not found.</p></div>;
  }

  return (
    <div className="main-container">
      <div className="card">
        <h2>{post.title}</h2>

        <p style={{ marginTop: "15px", whiteSpace: "pre-line" }}>
          {post.content}
        </p>

        <hr style={{ margin: "20px 0" }} />

        <p>
          <strong>Author:</strong>{" "}
          {post.author?.username || post.author?.name || "Unknown"}
        </p>

        <p>
          <strong>Posted on:</strong>{" "}
          {new Date(post.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default PostDetails;
