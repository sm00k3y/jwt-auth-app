import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-elem">
        <Link to="/">Home</Link>
      </div>
      <div className="navbar-elem">
        <Link to="/login">Login</Link>
      </div>
      <div className="navbar-elem">
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default NavBar;
