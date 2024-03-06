//create admin api app
const exp=require('express');
adminApp=exp.Router();
adminApp.get('/test',(req,res)=>{
    res.send({message:"This from admin-api"})
})

//export adminApp
module.exports=adminApp;