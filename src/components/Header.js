import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

function Header() {
  return (
    <header>
      <div className="header-container">
        <div className="header-title">
          <h1>Appointment App</h1>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/booking">Book Appointment</Link>
            </li>
            <li>
              <Link to="/appointments">Appointment History</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;