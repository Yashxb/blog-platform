import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getPosts } from "../services/postService";
import PostItem from "../components/PostItem";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const loadMyPosts = async () => {
      if (!user) return;
      try {
        const res = await getPosts();
        const filtered = res.data.filter((p) => p.author?._id === user._id);
        setMyPosts(filtered);
      } catch (err) {
        console.error(err);
      }
    };
    loadMyPosts();
  }, [user]);

  if (!user) return <h2>Please login to view your profile.</h2>;

  return (
    <div className="main-container">
      <div className="profile-card">
  <p><strong>Name:</strong> {user.username}</p>
  <p><strong>Email:</strong> {user.email}</p>
</div>

      <h2 className="section-title">My Posts</h2>
      <div className="grid">
        {myPosts.length === 0 ? (
          <p>You haven't created any posts yet.</p>
        ) : (
          myPosts.map((post) => <PostItem key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default MyProfile;
