import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkUser } from "../../api";
import "./Login.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await checkUser({ email, password });
      const loggedUser = response.data;
      setError("");
      onLogin(loggedUser);
      navigate("/");
    } catch (error) {
      setError("Inicio de sesión fallido. Por favor, comprueba tus credenciales.");
    }
  };

  return (
    <div className="container-login">
      <div className="login-form-container">
        <h2>Log in</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="form-control"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                onClick={togglePasswordVisibility}
                className="password-icon"
              />
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">
            Log in
          </button>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="signup-link">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
