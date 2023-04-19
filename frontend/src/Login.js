import { useState } from 'react';
import './Login.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="login-header">Login</h1>
        <div className="login-input-container">
          <label htmlFor="email" className="login-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="login-input"
          />
        </div>
        <div className="login-input-container">
          <label htmlFor="password" className="login-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="login-input"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;