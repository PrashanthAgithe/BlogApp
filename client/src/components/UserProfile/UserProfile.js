import React from 'react'
import { Outlet } from 'react-router-dom'
function UserProfile() {
  return (
    <div>
      <div className="articleheadingdiv">
        <h1 className='articleheading'>Articles</h1>
        </div>
      <Outlet />
    </div>
  )
}

export default UserProfile