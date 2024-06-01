import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { resetState, userAuthorLoginThunk } from '../../redux/slices/userAuthorSlice'
import './SignIn.css'
import { useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading'
function SignIn() {
  let {register,handleSubmit,formState:{errors}}=useForm()
  let dispatch=useDispatch()
  let navigate=useNavigate()
  let {isPending,islogedin,currentUser,errorOccurred,errMsg}=useSelector(state=>state.userAuthorLoginReducer)
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
    }else{
      dispatch(resetState())
    }
  },[islogedin])
  //changing errormsg to string is they are object
  const errorMessage = typeof errMsg === 'object' ? JSON.stringify(errMsg) : errMsg
  return (
    <div className='signup'>
      <form onSubmit={handleSubmit(handlesubmitform)}>
        <h1 className='signuptitle'>Signin</h1>
        {errorOccurred && <p style={{color:'red'}}>{errorMessage}</p>}
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
            <input type="radio" name="usertype" id="admin" value={'admin'} {...register('userType',{required:true})} disabled/>
            <label className='userlabel' for="admin">Admin</label>
          </div>
        </div>
          {
            errors.userType?.type==='required' && <p style={{color:'red'}}>Please select User Type</p>
          }
        <div className='inputs'>
          <label for="username" className='inputlabel'>Username</label>
          <input type="text" name="username" id="username" placeholder='Enter username' {...register('username',{required:true})}/>
          {
            errors.username?.type==='required' && <p style={{color:'red'}}>Username Required</p>
          }
        </div>
        <div className='inputs'>
          <label for="password" className='inputlabel'>Password</label>
          <input type="password" name="password" id="password" placeholder='Enter password' {...register('password',{required:true})}/>
          {
            errors.password?.type==='required' && <p style={{color:'red'}}>Password Required</p>
          }
        </div>
        <button type="submit" className='login'>
          {
            isPending ? <Loading />:'Login'
          }
        </button>
      </form>
    </div>
  )
}

export default SignIn