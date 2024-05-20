import React from 'react'
import './AddArticle.css'
import { useState,useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { createAxiosWithToken } from '../../axiosWithToken'
import { useNavigate } from "react-router-dom";
function AddArticle() {
  let {register,handleSubmit}=useForm()
  let [err, setErr] = useState("");
  let navigate = useNavigate();
  let {currentUser,islogedin}=useSelector(state=>state.userAuthorLoginReducer)

  const postNewArticle = async (article) => {
    article.dateOfCreation = new Date();
    article.dateOfModification = new Date();
    article.articleId = Date.now();
    article.username = currentUser.username;
    article.comments = [];
    article.status = true;
    const axiosWithToken=createAxiosWithToken()
   //make HTTP post req
   let res=await axiosWithToken.post('http://localhost:4000/author-api/article',article)
   if(res.data.message==='article created'){
    navigate('/author-profile/articles')
   }else{
    setErr(res.data.message)
    alert("please login to post article");
    localStorage.removeItem('token');
    navigate('/signin');
   }
  };
  useEffect(()=>{
    if(islogedin===true){
    }else{
      alert("plz login to post article");
      localStorage.removeItem('token');
      navigate('/signin');
    }
  },[islogedin])
  return (
    <div className='addarticle'>
      <form onSubmit={handleSubmit(postNewArticle)} >
      <div className="">
        <label htmlFor="title" className="">Title:</label>
        <input type="text" className="" id="title" {...register("title")}
        />
      </div>
      <div className="">
        <label htmlFor="category" className="">category:</label>
        <select {...register("category")} id="category" className="" >
          <option value="programming">Programming</option>
          <option value="AI&ML">AI&ML</option>
          <option value="database">Database</option>
        </select>
      </div>
      <div className="">
      <label htmlFor="content" >Content:</label>
      </div>
      <div className="textarea">
        <textarea {...register("content")} className="" id="content" rows="10"
        ></textarea>
      </div>
      <button type="submit">Post</button>
      </form>
    </div>
  )
}

export default AddArticle