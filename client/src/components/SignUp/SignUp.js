import React from 'react'
import './SignUp.css'
import {useForm} from 'react-hook-form'
function SignUp() {
  let {register,handleSubmit,formState:{errors}}=useForm()
  function handlesubmitform(userobj){
    console.log(userobj);
  }
  return (
    <div className='signup'>
      <form onSubmit={handleSubmit(handlesubmitform)}>
      <h1 className='signuptitle'>Signup</h1>
        <div className='usertype'>
          <div className='user'>
            <input type="radio" name="usertype" id="author" value={'author'} {...register('userType',{required:true})}/>
            <label className='userlabel' for="author">Autor</label>
          </div>
          <div className='user'>
            <input type="radio" name="usertype" id="user" value={'user'} {...register('userType',{required:true})}/>
            <label className='userlabel' for="user">User</label>
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
        <div className='inputs' >
          <label for="email" className='inputlabel'>Email</label>
          <input type="text" name="email" id="email" placeholder='Please enter email' {...register('email',{required:true})}/>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default SignUp