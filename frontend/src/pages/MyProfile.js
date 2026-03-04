import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getPosts } from "../services/postService";
import PostItem from "../components/PostItem";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const loadMyPosts = async () => {
      if (!user) return;

      try {
        const posts = await getPosts();  // FIXED
        const filtered = posts.filter(
          (p) => p.author?._id === user._id
        );
        setMyPosts(filtered);
      } catch (err) {
        console.error(err);
      }
    };

    loadMyPosts();
  }, [user]);

  if (!user)
    return (
      <div className="main-container">
        <h2>Please login to view your profile.</h2>
      </div>
    );

  return (
    <div className="main-container">
      <div className="profile-card">
        
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <h2 className="page-title">My Posts</h2>

      <div className="grid">
        {myPosts.length === 0 ? (
          <p>You haven't created any posts yet.</p>
        ) : (
          myPosts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyProfile;
