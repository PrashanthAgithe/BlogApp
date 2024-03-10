import React from 'react'
import './AddArticle.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { axiosWithToken } from '../../axiosWithToken'
import { useNavigate } from "react-router-dom";
function AddArticle() {
  let {register,handleSubmit}=useForm()
  let [err, setErr] = useState("");
  let navigate = useNavigate();
  let {currentUser}=useSelector(state=>state.userAuthoruserAuthorLoginReducer)

  const postNewArticle = async (article) => {
    article.dateOfCreation = new Date();
    article.dateOfModification = new Date();
    article.articleId = Date.now();
    article.username = currentUser.username;
    article.comments = [];
    article.status = true;
   //make HTTP post req
   let res=await axiosWithToken.post('http://localhost:4000/author-api/article',article)
   console.log(res)
   if(res.data.message==='article created'){
    navigate('/author-profile/articles')
   }else{
    setErr(res.data.message)
    alert("please login to post article");
   }
  };

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