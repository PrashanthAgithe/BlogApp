import React, { useEffect } from 'react'
import './Home.css'
import { NavLink, useNavigate} from 'react-router-dom';
import { IoMdLock } from "react-icons/io";
import { useSelector } from 'react-redux';
function Home() {
  let {islogedin,currentUser}=useSelector(state=>state.userAuthorLoginReducer)
  let navigate=useNavigate()
  useEffect(()=>{
    if(islogedin){
      if(currentUser.userType==='author'){
        navigate('author-profile/articles')
      }else if(currentUser.userType==='user'){
        navigate('user-profile')
      }
    }
  },[])
  return (
    <div className='home'>
      <div class="homewelcome">
        <h1>Welcome to My Blog </h1>
        <p>Discover interesting articles on various topics.</p>
      </div>
      <pre className='homepage'>
        <IoMdLock />Please <NavLink  to='signin' style={{color:'white'}} >Login</NavLink> To Continue</pre>
      <div class="homeabout">
        <h2>About This Blog</h2>
        <p>This blog is dedicated to educational content across various subjects.You'll find articles that inspire and educate.</p>
      </div>
    </div>
  )
}

export default Home