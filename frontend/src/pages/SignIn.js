import { useState, useContext } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const SignIn = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(data);

      
      localStorage.setItem("token", res.data.token);

      
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      
      setUser(res.data.user);

      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <form className="auth-form" onSubmit={submit}>
      <h2>Welcome Back</h2>

      <input
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={(e) =>
          setData({ ...data, email: e.target.value })
        }
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={(e) =>
          setData({ ...data, password: e.target.value })
        }
        required
      />

      <button className="btn-primary">Login</button>
    </form>
  );
};

export default SignIn;