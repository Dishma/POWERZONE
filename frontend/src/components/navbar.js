import React, { Component } from 'react';
import '../styles/css/navbar.css';

export default class navbar extends Component {
  render() {
    return (

      <div className='navb'>
        <ul className='navbar nav justify-content-center ul'>
          <li className='li'><a href="/adminhome">Admin Home</a></li>
          <li className='li'><a href="/memberlist">Member List</a></li>
          <li className='li'><a href="/workoutplans">Workout Plans</a></li>
        </ul>
      </div>

    )
  }
}