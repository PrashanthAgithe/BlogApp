import React from 'react'
import './SignUp.css'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Loading from '../Loading/Loading'
function SignUp() {
  let {register,handleSubmit,formState:{errors}}=useForm()
  let [err,seterr]=useState('');
  let navigate=useNavigate();
  let [ispending,setispending]=useState(false)
  async function handlesubmitform(userobj){
    setispending(true)
    if(userobj.userType==='user'){
      //make http post req
      let res=await axios.post(`${process.env.REACT_APP_API_URL}/user-api/new-user`,userobj)
      setispending(false)
      if(res.data.message==="User created"){
        navigate('/signin');
      }else{
        seterr(res.data.message);
      }
    }else{
      let res=await axios.post(`${process.env.REACT_APP_API_URL}/author-api/new-user`,userobj)
      setispending(false)
      if(res.data.message==="Author created"){
        navigate('/signin');
      }else{
        seterr(res.data.message);
      }
    }
  }
  return (
    <div className='signup'>
      <form onSubmit={handleSubmit(handlesubmitform)}>
      <h1 className='signuptitle'>Signup</h1>
      {err.length!==0 && <p style={{color:'red'}}>{err}</p>}
        <div className='usertype'>
          <div className='user'>
            <input type="radio" name="usertype" id="author" value={'author'} {...register('userType',{required:true})}/>
            <label className='userlabel' for="author">Author</label>
          </div>
          <div className='user'>
            <input type="radio" name="usertype" id="user" value={'user'} {...register('userType',{required:true})}/>
            <label className='userlabel' for="user">User</label>
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
        <div className='inputs' >
          <label for="email" className='inputlabel'>Email</label>
          <input type="text" name="email" id="email" placeholder='Enter email' {...register('email',{required:true})}/>
          {
            errors.email?.type==='required' && <p style={{color:'red'}}>Email Required</p>
          }
        </div>
        <button type="submit">
          {
            ispending?<Loading />:'Register'
          }
          </button>
      </form>
    </div>
  )
}

export default SignUp