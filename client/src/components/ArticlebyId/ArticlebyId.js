import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { createAxiosWithToken } from '../../axiosWithToken'
import './ArticlebyId.css'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdRestore } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
function ArticlebyId() {
  let {state}=useLocation()
  let [commentsList,setcomments]=useState(state.comments.slice().reverse())
  //let [status,setstatus]=useState(state.status);
  let navigate=useNavigate()
  let {register,handleSubmit}=useForm()
  let {islogedin,currentUser}=useSelector(state=>state.userAuthorLoginReducer)
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
    let res=await axiosWithToken.put(`${process.env.REACT_APP_API_URL}/author-api/article`,Modifiedarticle);
    navigate(`../article/${state.articleId}`,{state:res.data.payload})
  }
  async function postcomment(comment){
    comment.username=currentUser.username;
    const axiosWithToken=createAxiosWithToken();
    let res=await axiosWithToken.post(`${process.env.REACT_APP_API_URL}/user-api/comment/${state.articleId}`,comment);
    setcomments(res.data.payload.slice().reverse());
  }
  async function deleteOrRestoreArticle(){
    let article={...state};
    const axiosWithToken=createAxiosWithToken()
    delete article._id;
    let res=await axiosWithToken.put(`${process.env.REACT_APP_API_URL}/author-api/article/${state.articleId}`,article)
    navigate(`../article/${state.articleId}`,{state:res.data.payload})
  }
  useEffect(()=>{
    if(islogedin===false){
      alert("plz login to view article");
      localStorage.removeItem('token');
      navigate('/signin');
    }
  },[islogedin])
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
          <div className='editdeletebtn'>
            <button className='edit btn' onClick={()=>edit(true)}><FaEdit /></button>
            { state.status===true?
              <button className='delete btn' onClick={()=>deleteOrRestoreArticle()}><MdDelete /></button>:
              <button className='btn' onClick={()=>deleteOrRestoreArticle()}><MdRestore /></button>
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
            <div>
              <input type="text" className='commentsinput' placeholder='Write a comment..' {...register('comment')}/>
              <button>Add comment</button>
            </div>
          </form>
          }
        {commentsList.length===0?
          <div><hr></hr><h2>No comments yet...</h2></div>:
          commentsList.map((value)=>
            <div className='comment'>
              <hr></hr>
              <h3><IoPersonCircle /> {value.username}</h3>
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