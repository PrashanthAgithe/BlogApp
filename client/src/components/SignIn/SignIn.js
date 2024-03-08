import React from 'react'
import {useForm} from 'react-hook-form'
import './SignIn.css'
function SignIn() {
  let {register,handleSubmit,formState:{errors}}=useForm()
  function handlesubmitform(userobj){
    console.log(userobj);
  }
  return (
    <div className='signin'>
      <form onSubmit={handleSubmit(handlesubmitform)}>
        <div className='usertype'>
          <div className='user'>
            <input type="radio" name="usertype" id="author" value={'author'} {...register('userType',{required:true})}/>
            <label className='userlabel' for="author">Autor</label>
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
          <input type="text" name="username" id="username" placeholder='Please enter username' {...register('username',{required:true})}/>
        </div>
        <div className='inputs'>
          <label for="password" className='inputlabel'>Password</label>
          <input type="password" name="password" id="password" placeholder='Please enter password' {...register('password',{required:true})}/>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default SignIn