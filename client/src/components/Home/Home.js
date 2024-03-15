import React from 'react'
import './Home.css'
import { NavLink} from 'react-router-dom';
import { IoMdLock } from "react-icons/io";
function Home() {
  return (
    <div className='home'>
      <pre className='homepage'><IoMdLock />Please <NavLink  to='signin'>login</NavLink> to continue</pre>
    </div>
  )
}

export default Home