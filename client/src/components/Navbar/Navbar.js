import React from 'react'
import './Navbar.css';
import { NavLink } from 'react-router-dom';
function Navbar() {
  return (
    <div className='navbar'>
      <div className="icon">
        <p>BLOG</p>
      </div>
      <div>
        <ul>
          <li><NavLink className='nav-item' to=''>Home</NavLink></li>
          <li><NavLink className='nav-item' to='signup'>SignUp</NavLink></li>
          <li><NavLink className='nav-item' to='signin'>SignIn</NavLink></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar