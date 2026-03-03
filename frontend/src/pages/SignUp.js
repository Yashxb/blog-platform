import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { user, setUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  
  const hardcodedToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTMxOWM5ODEyZTUxOWJjNWI0ODg5YiIsImlhdCI6MTc3MjI5NjczOCwiZXhwIjoxNzcyOTAxNTM4fQ.nCrcMtVe5CISi0CDpz8mWOMoGX4nq9-4ZwZmBvOLZUE";
  const hardcodedUser = {
    _id: "69a319c9812e519bc5b4889b",
    username: "Yash",
    email: "yash@gmail.com",
  };

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const submit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      alert("Please fill all fields");
      return;
    }

    // Simulate registration + login
    localStorage.setItem("token", hardcodedToken);
    localStorage.setItem("user", JSON.stringify(hardcodedUser));
    setUser(hardcodedUser);
    alert("Registered and logged in as Yash!");
    navigate("/"); 
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  if (user) {
    return (
      <div className="auth-form">
        <h2>
          Logged in as {user.username} ({user.email}) ✅
        </h2>
        <button className="btn-primary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  }


  return (
    <div className="main-container">
      <form className="auth-form" onSubmit={submit}>
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit" className="btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
