import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await registerUser(form);

      if (!res || !res.user) {
        alert("Registration failed");
        return;
      }

      alert("Registered successfully! Please login.");
      navigate("/signin"); 
    } catch (err) {
      console.error("Registration error:", err.response || err);
      const message =
        err.response?.data?.message || "Registration failed";
      alert(message);
    }
  };

  return (
    <div className="main-container">
      <form className="auth-form" onSubmit={submit}>
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit" className="btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;