import React from 'react'
import {BrowserRouter, Routes, Route, Link, useLocation} from "react-router-dom";
import Homepage from './Homepage'
import Login from './Login';
import Register from './Register';
import CreateSession from './CreateSession';
import JoinSession from './JoinSession';
import './App.css'

function NavHeader() {
  const location = useLocation()
  return (
    <nav className="nav-header">
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
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <NavHeader/>
        <Routes>
            <Route exact path = "/" element = {<Homepage/>}/>
            <Route path = "/login" element = {<Login/>}/>
            <Route path = "/home" element = {<Homepage/>}/>
            <Route path = "/register" element = {<Register/>}/>
            <Route path = "/create" element = {<CreateSession/>}/>
            <Route path = "/join" element = {<JoinSession/>}/>
        </Routes>   
    </BrowserRouter>
  );
}
