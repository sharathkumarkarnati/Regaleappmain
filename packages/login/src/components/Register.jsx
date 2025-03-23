import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./FormStyles.css";
import { useEnvConfig } from "../EnvContext";

const Register = () => {
  const [error, setError] = useState();
  const config = useEnvConfig();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.querySelector("#email").value;
    const password = form.querySelector("#password").value;

    try {
      const response = await axios.post(
        `${config.serverURI}/api/auth/register`,
        {
          email,
          password,
        },
        {
          validateStatus: (status) => status === 201 || status === 409,
        },
      );

      setError();

      console.log(response);

      switch (response.status) {
        case 201: {
          window.location.assign(`${config.appURI}?t=${response.data.token}`);
          break;
        }
        case 409: {
          setError("email already taken. Try a new one!");
          break;
        }
        default: {
          throw new Error("Unknown error");
        }
      }
    } catch {
      setError("Failed to create account");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Sign Up</h2>
        <form onSubmit={handleRegister}>
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
            <input
              type="password"
              required
              placeholder="Enter your password"
              id="password"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>
        <p>
          Already have an account? <Link to="/">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
