import { useEffect, useState, useContext } from "react";
import { getPosts } from "../services/postService";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PostItem from "../components/PostItem";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await getPosts();
        setPosts(res.data);
      } catch (error) {
import { useEffect, useState, useContext } from "react";
import { getPosts, deletePost } from "../services/postService";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PostItem from "../components/PostItem";

const Dashboard = () => {
  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const { user } = useContext(AuthContext);

  // Fetch all posts
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getPosts(); 
        setPosts(data || []);
      } catch (error) {
        console.error("Failed to load posts", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Delete a post
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await deletePost(id);
      // Remove post from state
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      alert("Post deleted successfully ✅");
    } catch (error) {
      console.error("Failed to delete post", error.response?.data || error);
      alert(
        error.response?.data?.message ||
          "You are not authorized to delete this post ❌"
      );
    }
  };

  if (loading) return <p>Loading posts...</p>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="page-title">Latest Articles</h1>

        {user && (
          <div className="user-info">
            <span>Welcome, {user.username}</span>
            <Link to="/profile" className="profile-btn">
              Profile
            </Link>
          </div>
        )}
      </div>

      <div className="grid">
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} style={{ marginBottom: "20px" }}>
              <PostItem post={post} />

              {/* Show Remove button only if post belongs to logged-in user */}
              {user &&
                ((post.user && post.user._id === user._id) || // if user is nested
                  post.userId === user._id) && ( // or if userId is flat
                  <button
                    onClick={() => handleDelete(post._id)}
                    style={{
                      marginTop: "8px",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
