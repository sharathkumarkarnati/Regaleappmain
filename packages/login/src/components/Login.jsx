import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./FormStyles.css";
import { useEnvConfig } from "../EnvContext";

const Login = () => {
  const [error, setError] = useState();
  const config = useEnvConfig();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const email = form.querySelector("#email").value;
    const password = form.querySelector("#password").value;

    try {
      const response = await axios.post(
        `${config.serverURI}/api/auth/login`,
        {
          email,
          password,
        },
        {
          validateStatus: (status) =>
            status === 200 || status === 401 || status === 404,
        },
      );

      setError();

      switch (response.status) {
        case 200: {
          // After login success, redirect to the Regale Recipe app
          window.location.assign(
            `${config.appURI}?token=${response.data.token}`,
          );
          break;
        }
        case 401: {
          setError("Invalid email or password");
          break;
        }
        case 404: {
          setError("User account not found. Please register first.");
          break;
        }
        default: {
          throw new Error("Unknown error");
        }
      }
    } catch {
      setError("Failed to login");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-input">
            <label>Email</label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              id="email"
            />
          </div>
          <div className="form-input">
            <label>Password</label>
            <input required placeholder="Enter your password" id="password" />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn">
            Login
          </button>
        </form>
        <p>
          Don&apos;t have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
