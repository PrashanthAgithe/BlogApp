//create express app
const exp=require('express');
const app=exp()
const cors = require('cors');
app.use(cors());
app.use(exp.json())
require('dotenv').config()

const path=require('path')
//deploy react build in this server.js
// app.use(exp.static(path.join(__dirname,'../client/build'))) 

app.use("/helloworld",(req,res)=>{
    res.send("Hello World");
})
// const mc=require('mongodb').MongoClient;
const mongoose=require('mongoose')
mongoose.connect(process.env.DB_URL)
.then(()=>{
    // //get db obj
    // const dbobj=client.db('blogdb')
    // //get collection obj
    // const userscollection=dbobj.collection('userscollection')
    // const articlescollection=dbobj.collection('articlescollection')
    // const authorscollection=dbobj.collection('authorscollection')
    // //sharing colelction 
    // app.set('userscollection',userscollection)
    // app.set('articlescollection',articlescollection)
    // app.set('authorscollection',authorscollection)
    console.log("DB connection success")
})
.catch(err=>console.log(err))
const userscollection=mongoose.model('userscollection',{
    userType:{
      type:String,
      required:true,
    },
    username:{
      type:String,
      required:true,
    },
    password:{
      type:String,
      required:true,
    },
    email:{
      type:String,
      required:true,
    }
  })
const authorscollection=mongoose.model('authorscollection',{
    userType:{
      type:String,
      required:true,
    },
    username:{
      type:String,
      required:true,
    },
    password:{
      type:String,
      required:true,
    },
    email:{
      type:String,
      required:true,
    }
  })
  const articlescollection=mongoose.model('articlescollection',{
    title: {
      type:String,
      required:true,
    },
    category: {
      type:String,
      required:true,
    },
    content: {
      type:String,
      required:true,
    },
    dateOfCreation: {
      type:Date,
      required:true,
    },
    dateOfModification: {
      type:Date,
      required:true,
    },
    articleId: {
      type:Number,
      required:true,
    },
    username: {
      type:String,
      required:true,
    },
    comments: {
      type:Object,
      required:true,
    },
    status: {
      type:Boolean,
      required:true,
    }
  })
  module.exports={userscollection,authorscollection,articlescollection};

//importing API routes
const userApp=require('./APIs/user-api')
const authorApp=require('./APIs/author-api')
const adminApp=require('./APIs/admin-api')

app.use('/user-api',userApp)
app.use('/author-api',authorApp)
app.use('/admin-api',adminApp)

//deals with the refresh
// app.use((req,res,next)=>{
//     res.sendFile(path.join(__dirname,'../client/build/index.html'))
// })

//error handling middleware
app.use((err,req,res,next)=>{
    res.send({message:"error",payload:err.message})
})
//assign port number
const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`Web server on port ${port}`))