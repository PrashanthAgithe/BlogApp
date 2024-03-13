import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { userAuthorLoginThunk } from '../../redux/slices/userAuthorSlice'
import './SignIn.css'
import { useNavigate } from 'react-router-dom'
function SignIn() {
  let {register,handleSubmit,formState:{errors}}=useForm()
  let dispatch=useDispatch()
  let navigate=useNavigate()
  let {islogedin,currentUser,errorOccurred,errMsg}=useSelector(state=>state.userAuthoruserAuthorLoginReducer)
  
  function handlesubmitform(userobj){
    dispatch(userAuthorLoginThunk(userobj));
  }

  useEffect(()=>{
    if(islogedin===true){
      if(currentUser.userType==='user'){
        navigate('/user-profile')
      }else{
        navigate('/author-profile/articles')
      }
    }
  },[islogedin])
  return (
    <div className='signup'>
      <form onSubmit={handleSubmit(handlesubmitform)}>
        <h1 className='signuptitle'>Signin</h1>
        <div className='usertype'>
          <div className='user'>
            <input type="radio" name="usertype" id="author" value={'author'} {...register('userType',{required:true})}/>
            <label className='userlabel' for="author">Author</label>
          </div>
          <div className='user'>
            <input type="radio" name="usertype" id="user" value={'user'} {...register('userType',{required:true})}/>
            <label className='userlabel' for="user">User</label>
          </div>
          <div className='user'>
            <input type="radio" name="usertype" id="admin" value={'admin'} {...register('userType',{required:true})}/>
            <label className='userlabel' for="admin">Admin</label>
          </div>
        </div>
        <div className='inputs'>
          <label for="username" className='inputlabel'>Username</label>
          <input type="text" name="username" id="username" placeholder='Enter username' {...register('username',{required:true})}/>
        </div>
        <div className='inputs'>
          <label for="password" className='inputlabel'>Password</label>
          <input type="password" name="password" id="password" placeholder='Enter password' {...register('password',{required:true})}/>
        </div>
        <button type="submit" className='login'>Login</button>
      </form>
    </div>
  )
}

export default SignIn