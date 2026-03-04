import { useEffect, useState, useContext } from "react";
import { getPosts } from "../services/postService";
import { AuthContext } from "../context/AuthContext";
import PostItem from "../components/PostItem";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error loading posts:", error);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="main-container">
        <p>Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="main-container">
      <h2 className="page-title">📖Latest Articles📖</h2>

      {user && (
        <p style={{ marginBottom: "30px" }}>
          WELCOME USER 😊, <strong>{user.username}</strong>
        </p>
      )}

     
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
