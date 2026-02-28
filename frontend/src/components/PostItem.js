import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  return (
    <div className="card">
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}...</p>
      <Link className="btn-secondary" to={`/post/${post._id}`}>
        Read More
      </Link>
    </div>
  );
};

export default PostItem;