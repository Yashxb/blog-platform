import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  if (!post) return null;

 
  const previewText =
    post.content && post.content.length > 100
      ? post.content.substring(0, 100) + "..."
      : post.content;

  return (
    <div className="card">
      <h3>{post.title}</h3>

      <p style={{ margin: "10px 0" }}>
        {previewText}
      </p>

      <Link to={`/post/${post._id}`} className="btn-secondary">
        Read More
      </Link>
    </div>
  );
};

export default PostItem;
