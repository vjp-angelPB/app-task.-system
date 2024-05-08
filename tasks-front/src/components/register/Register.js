import React, { useState } from 'react';
import { createUser } from "../../api";
import { useNavigate } from "react-router-dom";
import './Register.css'; 
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [city, setCity] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [error, setError] = useState('');

  let navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return false;
    }
    const regexStartsWithCapital = /^[A-Z].*/;
    if (!regexStartsWithCapital.test(password)) {
      return false;
    }
    const regexSpecialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    if (!regexSpecialCharacters.test(password)) {
      return false;
    }
    return true;
  };
  

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const validateCity = (city) => {
    const regex = /^[A-Z][a-zA-Z\s'áéíóúÁÉÍÓÚ-]{1,}$/;
    return regex.test(city);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError('');

    if (!name.trim() || !email.trim() || !password.trim() || !repeatPassword.trim() || !city.trim()) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    if (password !== repeatPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (!validatePassword(password)) {
      setError('La contraseña debe tener al menos 8 caracteres, comenzar con mayúscula y contener al menos un carácter especial.');
      return;
    }

    if (!validateCity(city)) {
      setError('La ciudad introducida no es válida. Por favor, inténtalo de nuevo.');
      return;
    }
    const user = { name, email, password, city };

    createUser(user);

    navigate("/login");

    setName('');
    setEmail('');
    setPassword('');
    setRepeatPassword('');
    setCity('');
  };

  return (
    <div className="container-register">
      <div className="register-form-container">
        <h2>User Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
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
                icon={showPassword ? faEyeSlash : faEye}
                onClick={() => setShowPassword(!showPassword)}
                className="password-icon"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="repeatPassword">Repeat Password:</label>
            <div className="password-input-container">
              <input
                type={showRepeatPassword ? "text" : "password"}
                id="repeatPassword"
                value={repeatPassword}
                onChange={handleRepeatPasswordChange}
                className="form-control"
              />
              <FontAwesomeIcon
                icon={showRepeatPassword ? faEyeSlash : faEye}
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                className="password-icon"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={handleCityChange}
              className="form-control"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
