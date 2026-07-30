import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import "../styles/Login.css";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const login = async () => {

    try {

      const response = await api.post(
        "/auth/login",
        form
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/dashboard");

    } catch {

      alert("Invalid username or password");
    }
  };

  return (

    <div className="login-page">

      <div className="login-card">

        <h2>Smart Parking System</h2>

        <p className="sub-title">
          Login to continue
        </p>

        <input
          className="input-field"
          placeholder="Username"
          onChange={(e) =>
            setForm({
              ...form,
              username: e.target.value,
            })
          }
        />

        <input
          type="password"
          className="input-field"
          placeholder="Password"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <button
          className="primary-btn"
          onClick={login}
        >
          Login
        </button>

        <p className="register-link">
          New user? <Link to="/register">Register</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;