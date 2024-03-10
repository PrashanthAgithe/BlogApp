import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import './AuthorsProfile.css'
function AuthorsProfile() {
  return (
    <div>
      <div class="authorsnav">
        <ul className='authorsul'>
          <li>
            <div className="articleheadingdiv">
              <NavLink className='nav-item authorli' to='articles'><h1 className='articleheading'>Articles</h1></NavLink>
            </div>
          </li>
          <li>
            <div className="articleheadingdiv">
              <NavLink className='nav-item authorli' to='new-article'><h1 className='articleheading'>New Article</h1></NavLink>
            </div>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  )
}

export default AuthorsProfile