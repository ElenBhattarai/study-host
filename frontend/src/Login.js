import { useState } from 'react';
import './Login.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password})
    };
    try {
      const response = await fetch('http://localhost:8000/login', requestOptions);
      if(response.status === 400)
      {
        toast.error('Wrong email or password!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        setEmail('')
        setPassword('')
      } else {
        const data = await response.json()
        console.log(data)
        sessionStorage.setItem('loggedIn', true)
        sessionStorage.setItem('user_id', data.user_id)
        sessionStorage.setItem('firstname', data.firstname)
        sessionStorage.setItem('lastname', data.lastname)
        await navigate('/');
        window.location.reload(true);
      }
      
    } catch(err) {
      console.log(err)
    }
  };
  

  return (
    <div className="login-container">
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
        </button><br/>
        <div className="register-link-container">
          <span>Don't have an account? </span>
          <Link to="/register" className="register-link">Register here</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;