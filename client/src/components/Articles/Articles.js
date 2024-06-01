import React, { useEffect } from 'react'
import './Articles.css'
import axios from 'axios'
import { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetState } from '../../redux/slices/userAuthorSlice'
function Articles() {
  let dispatch=useDispatch();
  let [articlesList,setarticles]=useState([])
  let {islogedin,currentUser}=useSelector(state=>state.userAuthorLoginReducer)
  async function getarticlesofauthor(){
    let token=localStorage.getItem('token');
    const axiosWithToken=axios.create({
      headers:{Authorization:`Bearer ${token}`}
    })
    let res=await axiosWithToken.get(`${process.env.REACT_APP_API_URL}/author-api/articles/${currentUser.username}`)
    setarticles(res.data.payload);
  }
  async function getarticlesofallauthor(){
    let token=localStorage.getItem('token');
    const axiosWithToken=axios.create({
      headers:{Authorization:`Bearer ${token}`}
    })
    let res=await axiosWithToken.get(`${process.env.REACT_APP_API_URL}/user-api/articles`)
    if(res.data.payload==='jwt expired'){
      localStorage.removeItem('token');
      dispatch(resetState())
    }else {
      setarticles(res.data.payload);
    }
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
      localStorage.removeItem('token');
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