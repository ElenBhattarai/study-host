import React, { useState } from "react";
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="register-header">Register</h1>
        <div className="register-input-container">
          <label className="register-label" htmlFor="username">
            Username
          </label>
          <input
            className="register-input"
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div className="register-input-container">
          <label className="register-label" htmlFor="email">
            Email
          </label>
          <input
            className="register-input"
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="register-input-container">
          <label className="register-label" htmlFor="password">
            Password
          </label>
          <input
            className="register-input"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className="register-input-container">
          <label className="register-label" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            className="register-input"
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </div>
        <button className="register-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;