import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="header">
      <h2 className="logo">
        <Link to="/">BlogSpace</Link>
      </h2>

      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/new">Write</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/signin">Login</Link>
        <Link to="/signup">Register</Link>

        {user && (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;