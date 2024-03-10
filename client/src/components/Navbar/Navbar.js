import React from 'react'
import './Navbar.css';
import { NavLink} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { resetState } from '../../redux/slices/userAuthorSlice';
function Navbar() {
  let {islogedin,currentUser}=useSelector(state=>state.userAuthoruserAuthorLoginReducer)
  let dispatch=useDispatch()
  function signout(){
    //removing token from the local storage
    localStorage.removeItem('token');
    dispatch(resetState())
  }
  return (
    <div className='navbar'>
      <div className="icon">
        <p>BLOG</p>
      </div>
      <div>
        <ul>
          {(islogedin==false)?(
          <>
          <li><NavLink className='nav-item' to=''>Home</NavLink></li>
          <li><NavLink className='nav-item' to='signup'>SignUp</NavLink></li>
          <li><NavLink className='nav-item' to='signin'>SignIn</NavLink></li>
          </>
          ):(
            <>
            <h1 className='welcome'>Welcome &lt;<h1 className='username'>{currentUser.username}</h1>&gt; </h1>
            <li><NavLink className='nav-item' to='signin' onClick={signout}> SignOut</NavLink></li>
            </>
          )
          }
        </ul>
      </div>
    </div>
  )
}

export default Navbar