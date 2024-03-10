//create author api app
const exp=require('express');
const authorApp=exp.Router();
const expressAsyncHandler=require('express-async-handler')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const verifyToken=require('../Middlewares/verifyToken')

let authorscollection;
let articlescollection;
authorApp.use((req,res,next)=>{
    authorscollection=req.app.get('authorscollection')
    articlescollection=req.app.get('articlescollection')
    next()
})


//author registration route
authorApp.post('/new-user',expressAsyncHandler(async(req,res)=>{
    //get user
    const newUser=req.body;
    //check for duplicate user based on username
    const dbuser=await authorscollection.findOne({username:newUser.username})
    if(dbuser!==null){
        res.send({message:"Author already existed!"})
    }else{
        //hash the password
        newUser.password=await bcryptjs.hash(newUser.password,6)
        //create user
        await authorscollection.insertOne(newUser)
        //send res 
        res.send({message:"Author created"})
    }

}))


//author login
authorApp.post('/login',expressAsyncHandler(async(req,res)=>{
    //get usercred obj 
    const userCred=req.body;
    //check for username
    const dbuser=await authorscollection.findOne({username:userCred.username})
    if(dbuser===null){
        res.send({message:"Invalid username"})
    }else{
        //check for password
       const status=await bcryptjs.compare(userCred.password,dbuser.password)
       if(status===false){
        res.send({message:"Invalid password"})
       }else{
    //create jwt token
        const signedToken=jwt.sign({username:dbuser.username},process.env.SECRET_KEY,{expiresIn:'1d'})
    //send res
        res.send({message:"login success",token:signedToken,user:dbuser})
       }
    }
}))

//adding new article by author
authorApp.post('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get new article
    const newArticle=req.body;
    //post to artciles collection
    await articlescollection.insertOne(newArticle)
    //send res
    res.send({message:"article created"})
}))


//modify artcile by author
authorApp.put('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get modified article
    const modifiedArticle=req.body;
    //update by article id
   let result= await articlescollection.updateOne({articleId:modifiedArticle.articleId},{$set:{...modifiedArticle}})
    res.send({message:"Article modified"})
}))

//delete an article by article ID
authorApp.put('/article/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get articleId from url
    const artileIdu=req.params.articleId;
    //update status of article to false
    let result=await articlescollection.updateOne({articleId:artileIdu},{$set:{status:false}})
    res.send({message:"Article deleted"})
}))


//read articles of author
authorApp.get('/articles/:username',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get author's username
    const authorName=req.params.username;
    //get atricles whose status is true
    const artclesList=await articlescollection.find({status:true,username:authorName}).toArray()
    res.send({message:"atricles",payload:artclesList})

}))

//export authorApp
module.exports=authorApp;



  