import React from "react";
import {Link} from "react-router-dom"
import '../../styles/css/topnav.css'

function Topnav() {
  return (

  <div className='topnav'>
    <ul className='navbar nav justify-content-center ul'>
      <li className='li'><a href="/adminhome">
      <i class="fa-solid fa-user-shield"></i>&nbsp;&nbsp;Admin Home</a></li>

      <li className='li'><a href="/supplements">
      <i class="fa-solid fa-bottle-water"></i>&nbsp;&nbsp;Supplements</a></li>
      
      <li className='li'><a href="/orders">
      <i class="fa-solid fa-cart-arrow-down"></i>&nbsp;&nbsp;Supplement Orders</a></li>
    </ul>
  </div>
    
  );
}

export default Topnav;
