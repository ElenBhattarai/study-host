import React from 'react'
import './HomePage.css'
import {Link} from "react-router-dom";

export default function Homepage() {
    return (
        <div className="App">
          <header className="App-header">
            <h1>Study Host</h1>
            <div className="App-buttons">
              <button className='button'><Link to="/create">Create a new session</Link></button>
              <button className='button'>Join a study room</button>
            </div>
          </header>
        </div>
      );
}

