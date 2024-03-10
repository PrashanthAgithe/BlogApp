import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
function ArticlebyId() {
  let {state}=useLocation()
  let {islogedin,currentUser}=useSelector(state=>state.userAuthoruserAuthorLoginReducer)
  return (
    <div>
      <h1>{state.title}</h1>
      { 
        currentUser.userType==='author' && <h3>edit,delete</h3>
      }
    </div>
  )
}

export default ArticlebyId