import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getPosts } from "../services/postService";
import PostItem from "../components/PostItem";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const loadMyPosts = async () => {
      try {
        const res = await getPosts();

        // filter only posts created by this user
        const filtered = res.data.filter(
          (post) => post.author?._id === user?.id
        );

        setMyPosts(filtered);
      } catch (err) {
        console.error(err);
      }
    };

    if (user) loadMyPosts();
  }, [user]);

  return (
    <div className="profile-container">
      <h1 className="page-title">My Profile</h1>

      <div className="profile-card">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>

      <h2 className="section-title">My Posts</h2>

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