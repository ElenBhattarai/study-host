import React, {useState} from 'react'
import {BrowserRouter, Routes, Route, Link, useLocation, useNavigate} from "react-router-dom";
import Homepage from './Homepage'
import Login from './Login';
import Register from './Register';
import CreateSession from './CreateSession';
import JoinSession from './JoinSession';
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      {sessionStorage.getItem('loggedIn') &&
        < NavHeader/>
      }
        <Routes>
            <Route exact path = "/" element = {sessionStorage.getItem('loggedIn')? <Homepage/>:<Login/>}/>
            <Route path = "/login" element = {sessionStorage.getItem('loggedIn')? <Homepage/>:<Login/>}/>
            <Route path = "/register" element = {sessionStorage.getItem('loggedIn')? <Homepage/>:<Register/>}/>
            <Route path = "/create" element = {sessionStorage.getItem('loggedIn')?<CreateSession/>: <Login/>}/>
            <Route path = "/join" element = {sessionStorage.getItem('loggedIn')?<JoinSession/>:<Login/>}/>
        </Routes>   
    </BrowserRouter>
  );
}

function NavHeader() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async() => {
    sessionStorage.setItem('loggedIn', false)
    sessionStorage.clear()
    await navigate('/login')
    window.location.reload(true);
  }

  return (
    <>
    <nav className="nav">
      <div className='nav-header'>
        <Link className="nav-button" to="/">Home</Link>
        {location.pathname !== '/' && (
          <>
            {location.pathname !== '/create' && (
              <Link className="nav-button" to="/create">Create a new session</Link>
            )}
            {location.pathname !== '/join' && (
              <Link className="nav-button" to="/join">Join a study room</Link>
            )}
          </>
        )}
        </div>
        <div className='profile'>
          {(sessionStorage.getItem('loggedIn')) && (
            <>
            <div>{sessionStorage.getItem('firstname')}</div>
            <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
    </nav>
    
  </>
  );
}