import React from "react";
import {Link} from "react-router-dom"

function Topnav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a href="/adminhome" className="nav-link" > Admin Home <span className="sr-only"></span></a>
          </li>
          
          <li className="nav-item active">
            <a href="/allsupplements" className="nav-link" > All Supplements <span className="sr-only">(current)</span></a>
            
          </li>
          
          <li className="nav-item">
          <a href="/supplements/addsupplement" className="nav-link"> Add Supplements </a></li> 
            
        </ul>
      </div>
    </nav>
  );
}

export default Topnav;
