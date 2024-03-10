import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import './AuthorsProfile.css'
function AuthorsProfile() {
  return (
    <div>
      <div class="authorsnav">
        <ul className='authorsul'>
          <li><NavLink className='nav-item authorli' to='articles'>Articles</NavLink></li>
          <li><NavLink className='nav-item authorli' to='new-article'>Add New article</NavLink></li>
        </ul>
      </div>
      <Outlet />
    </div>
  )
}

export default AuthorsProfile