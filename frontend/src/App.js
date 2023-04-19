import React from 'react'
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './Homepage'
import Login from './Login';
import Register from './Register';
import CreateSession from './CreateSession';
import JoinSession from './JoinSession';

export default function App() {
  return (
    <BrowserRouter>
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
