import React from "react";
import {Link} from "react-router-dom"
import '../styles/css/topnav.css'

function Topnav() {
  return (

      <div className='topnav'>
        <ul className='navbar nav justify-content-center ul'>
          <li className='li'><a href="/adminhome">Admin Home</a></li>
          <li className='li'><a href="/supplements">Supplements</a></li>
          <li className='li'><a href="/workoutplans">Supplement Orders</a></li>
        </ul>
      </div>
    
  );
}

export default Topnav;
