import React, { useEffect } from 'react'
import './Articles.css'
import axios from 'axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Articles() {
  let [articlesList,setarticles]=useState([])
  let {islogedin,currentUser}=useSelector(state=>state.userAuthoruserAuthorLoginReducer)
  async function getarticlesofauthor(){
    let token=localStorage.getItem('token');
    const axiosWithToken=axios.create({
      headers:{Authorization:`Bearer ${token}`}
    })
    let res=await axiosWithToken.get(`http://localhost:4000/author-api/articles/${currentUser.username}`)
    setarticles(res.data.payload);
  }
  async function getarticlesofallauthor(){
    let token=localStorage.getItem('token');
    const axiosWithToken=axios.create({
      headers:{Authorization:`Bearer ${token}`}
    })
    let res=await axiosWithToken.get(`http://localhost:4000/user-api/articles`)
    setarticles(res.data.payload);
  } 
  useEffect(()=>{
    if(islogedin===true){
      if(currentUser.userType==='author'){
        getarticlesofauthor();
      }else{
        getarticlesofallauthor();
      }
    }else{
      alert("plz login to view articles");
      navigate('/signin');
    }
  },[islogedin])
  let navigate=useNavigate()
  function display_single_article(article){
    if(currentUser.userType==='user'){
      navigate(`./article/${article.articleId}`,{state:article})
    }else{
      navigate(`../article/${article.articleId}`,{state:article})
    }
  }
  function ISOtoUTC(iso) {
    let date = new Date(iso).getUTCDate();
    let month = new Date(iso).getUTCMonth()+1;
    let year = new Date(iso).getUTCFullYear();
    return `${date}/${month}/${year}`;
  }

  return (
    <div>
      <div class="articlescontainer">
        {
          articlesList.map((value,index)=>(
            <div className='article'>
              <h2 className='articletitle'>{value.title}</h2>
              <h3>Catagory &lt;{value.category}&gt;</h3>
              <button onClick={()=>display_single_article(value)} className='readarticle'>Read article</button>
              <p>Created On:{ISOtoUTC(value.dateOfCreation)}</p>
            </div>
            ))
        }
      </div>
    </div>
  )
}

export default Articles