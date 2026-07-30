import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "../styles/Register.css";

function Register() {

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const register = async () => {

    try {

      await api.post(
        "/auth/register",
        form
      );

      alert("Registered Successfully");

    } catch {

      alert("Registration Failed");
    }
  };

  return (

    <div className="login-page">

      <div className="login-card">

        <h2>Create Account</h2>

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
          onClick={register}
        >
          Register
        </button>

        <p className="register-link">
          Already have an account? <Link to="/">Login</Link>
        </p>

      </div>

    </div>
  );
}

export default Register;