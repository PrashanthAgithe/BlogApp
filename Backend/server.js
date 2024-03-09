//create express app
const exp=require('express');
const app=exp()
app.use(exp.json())
require('dotenv').config()

const path=require('path')
//deploy react build in this server.js
app.use(exp.static(path.join(__dirname,'../client/build'))) 

const mc=require('mongodb').MongoClient;

mc.connect(process.env.DB_URL)
.then(client=>{
    //get db obj
    const dbobj=client.db('blogdb')
    //get collection obj
    const userscollection=dbobj.collection('userscollection')
    const articlescollection=dbobj.collection('articlescollection')
    const authorscollection=dbobj.collection('authorscollection')
    //sharing colelction 
    app.set('userscollection',userscollection)
    app.set('articlescollection',articlescollection)
    app.set('authorscollection',authorscollection)
    console.log("DB connection success")
})
.catch(err=>console.log(err))

//importing API routes
const userApp=require('./APIs/user-api')
const authorApp=require('./APIs/author-api')
const adminApp=require('./APIs/admin-api')

app.use('/user-api',userApp)
app.use('/author-api',authorApp)
app.use('/admin-api',adminApp)

//deals with the refresh
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../client/build/index.html'))
})

//error handling middleware
app.use((err,req,res,next)=>{
    res.send({message:"error",payload:err.message})
})
//assign port number
const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`Web server on port ${port}`))