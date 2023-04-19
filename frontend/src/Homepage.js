import React from 'react'
import './HomePage.css'
import {Link} from "react-router-dom";

export default function Homepage() {
    return (
        <div className="App">
          <header className="App-header">
            <h1>Study Host</h1>
            <div className="App-buttons">
              <Link to="/create"><button className='button'>Create a new session</button></Link>
              <Link to="/join"><button className='button'>Join a study room</button></Link>
            </div>
          </header>
        </div>
      );
}

