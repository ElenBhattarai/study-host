import React, { useState } from "react";
import "./Register.css";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstname: firstName, lastname: lastName, email: email, password: password})
    };
    try {
      const response = await fetch('https://studyhostbackend.duckdns.org/register', requestOptions);
      const data = await response.json()
      console.log(data)
      sessionStorage.setItem('loggedIn', true)
      sessionStorage.setItem('user_id', data.user_id)
      sessionStorage.setItem('firstname', data.firstname)
      sessionStorage.setItem('lastname', data.lastname)
      await navigate('/');
      window.location.reload(true);
    } catch(err) {
      console.log(err)
    }
  };

  return (
    <>
    <div className="header">
        <h1>Study Host</h1>
    </div>
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="register-header">Register</h1>
        <div className="register-input-container">
          <label className="register-label" htmlFor="first-name">
            First Name
          </label>
          <input
            className="register-input"
            type="text"
            id="first-name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
        </div>
        <div className="register-input-container">
          <label className="register-label" htmlFor="last-name">
            Last Name
          </label>
          <input
            className="register-input"
            type="text"
            id="last-name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
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
        <button className="register-button" type="submit">
          Register
        </button><br/>
        <div className="register-link-container">
          <span>Already have an account? </span>
          <Link to="/login" className="register-link">Login here</Link>
        </div>
      </form>
    </div>
    </>
  );
}

export default Register;