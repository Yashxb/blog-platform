import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token"); 
    setUser(null); 
    navigate("/login"); 
  };

  if (!user) {
    return <h2>Please login to view your profile.</h2>;
  }

  return (
    <div className="container">
      <h2>Profile Page</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;