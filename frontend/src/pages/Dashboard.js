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
        console.error("Failed to load posts", error);
      }
    };

    loadPosts();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="page-title">Latest Articles</h1>

        {user && (
          <div className="user-info">
            <span>Welcome, {user.name}</span>
            <Link to="/profile" className="profile-btn">
              
            </Link>
          </div>
        )}
      </div>

      <div className="grid">
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;