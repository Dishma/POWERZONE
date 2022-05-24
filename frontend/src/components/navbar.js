import React, { Component } from 'react';
import '../styles/css/navbar.css';

export default class navbar extends Component {
  render() {
    return (

      <div className='navb'>
        <ul className='navbar nav justify-content-center ul'>
          <li className='li'><a href="/adminhome"><i class="fa-solid fa-user-shield"></i>&nbsp;&nbsp;Admin Home</a></li>
          <li className='li'><a href="/memberlist"><i class="fa-solid fa-users">&nbsp;&nbsp;</i>Member List</a></li>
          <li className='li'><a href="/workoutplans"><i class="fa-solid fa-dumbbell">&nbsp;&nbsp;</i>Workout Plans</a></li>
        </ul>
      </div>

    )
  }
}