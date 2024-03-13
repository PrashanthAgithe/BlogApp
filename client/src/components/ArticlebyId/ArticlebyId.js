import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { createAxiosWithToken } from '../../axiosWithToken'
import './ArticlebyId.css'

function ArticlebyId() {
  let {state}=useLocation()
  let [commentsList,setcomments]=useState(state.comments.slice().reverse())
  //let [status,setstatus]=useState(state.status);
  let navigate=useNavigate()
  let {register,handleSubmit}=useForm()
  let {islogedin,currentUser}=useSelector(state=>state.userAuthoruserAuthorLoginReducer)
  let [onedit,setonedit]=useState(false);
  function edit(value){
    setonedit(value)
  }
  async function puttingmodifiedarticle(article){
    edit(false);
    let Modifiedarticle={...state,...article};
    delete Modifiedarticle._id;
    Modifiedarticle.dateOfModification=new Date()
    const axiosWithToken=createAxiosWithToken();
    let res=await axiosWithToken.put('http://localhost:4000/author-api/article',Modifiedarticle);
    navigate(`../article/${state.articleId}`,{state:res.data.payload})
  }
  async function postcomment(comment){
    comment.username=currentUser.username;
    const axiosWithToken=createAxiosWithToken();
    let res=await axiosWithToken.post(`http://localhost:4000/user-api/comment/${state.articleId}`,comment);
    setcomments(res.data.payload.slice().reverse());
  }
  async function deleteOrRestoreArticle(){
    let article={...state};
    const axiosWithToken=createAxiosWithToken()
    delete article._id;
    let res=await axiosWithToken.put(`http://localhost:4000/author-api/article/${state.articleId}`,article)
    navigate(`../article/${state.articleId}`,{state:res.data.payload})
  }
  function ISOtoUTC(iso) {
    let date = new Date(iso).getUTCDate();
    let month = new Date(iso).getUTCMonth()+1;
    let year = new Date(iso).getUTCFullYear();
    return `${date}/${month}/${year}`;
  }
  return (
    <div>
    {onedit===false?
      <div className='articlebody'>
        <div className='articleheader'>
        <h1 className='articletitle'>{state.title}</h1>
        { 
          currentUser.userType==='author' && 
          <div>
            <button style={{backgroundColor:'orange'}} onClick={()=>edit(true)}>Edit</button>
            { state.status==true?
              <button style={{backgroundColor:'red'}} onClick={()=>deleteOrRestoreArticle()}>Delete</button>:
              <button onClick={()=>deleteOrRestoreArticle()}>Restore</button>
            }
          </div>
        }
        </div>
        <div className='articletimings'>
          <p>Created On:{ISOtoUTC(state.dateOfCreation)}</p>
          <p>Modified On:{ISOtoUTC(state.dateOfModification)}</p>
        </div>
        <div className='articlecontent'>
          <p>{state.content}</p>
        </div>
        <div class="comments">
          <h2>Comments</h2>
          {currentUser.userType==='user' && 
          <form onSubmit={handleSubmit(postcomment)}>
            <div class="commentsinput">
              <input type="text" placeholder='Write a comment..' {...register('comment')}/>
              <button>Add comment</button>
            </div>
          </form>
          }
        {commentsList.length===0?
          <div><hr></hr><h2>No comments yet...</h2></div>:
          commentsList.map((value)=>
            <div className='comment'>
              <hr></hr>
              <h3>{value.username}</h3>
              <p>{value.comment}</p>
            </div>
          )
        }
        </div>
        
      </div>:
      <div className='addarticle'>
        <form onSubmit={handleSubmit(puttingmodifiedarticle)}>
        <div className="">
          <label htmlFor="title" className="">Title:</label>
          <input type="text" className="" id="title" {...register("title")}
          defaultValue={state.title}/>
        </div>
        <div className="">
          <label htmlFor="category" className="">category:</label>
          <select {...register("category")} id="category" className="" defaultValue={state.category}>
            <option value="programming">Programming</option>
            <option value="AI&ML">AI&ML</option>
            <option value="database">Database</option>
          </select>
        </div>
        <div className="">
        <label htmlFor="content" >Content:</label>
        </div>
        <div className="textarea">
          <textarea {...register("content")} className="" id="content" rows="10" defaultValue={state.content}
          ></textarea>
        </div>
        <button type="submit" className='login'>Save</button>
        </form>
      </div>
    }
    </div>
  )
}

export default ArticlebyId