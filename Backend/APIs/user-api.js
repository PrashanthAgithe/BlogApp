//create user api app
const exp = require("express");
const userApp = exp.Router();
const bcryptjs = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const verifyToken=require('../middlewares/verifyToken')
require("dotenv").config();

// userApp.use((req, res, next) => {
  //   userscollection = req.app.get("userscollection");
  //   articlescollection = req.app.get("articlescollection");
  //   next();
  // });
const dbobj=require('../server')

//user registration route
userApp.post("/new-user",expressAsyncHandler(async (req, res) => {
    //get user resource from client
    const newUser = req.body;
    //check for duplicate user based on username
    const dbuser = await dbobj.userscollection.findOne({ username: newUser.username });
    if (dbuser !== null) {
      res.send({ message: "User already existed" });
    } else {
      newUser.password = await bcryptjs.hash(newUser.password, 5);
      //create user
      await dbobj.userscollection.insertMany([newUser]);
      //send res
      res.send({ message: "User created" });
    }
  })
);

//user login
userApp.post("/login",expressAsyncHandler(async (req, res) => {
    //get usercred obj 
    const userCred = req.body;
    const dbuser = await dbobj.userscollection.findOne({
      username: userCred.username,
    });
    if (dbuser === null) {
      res.send({ message: "Invalid username" });
    } else {
      //check for password
      const status = await bcryptjs.compare(userCred.password, dbuser.password);
      if (status === false) {
        res.send({ message: "Invalid password" });
      } else {
        //create jwt token
        const signedToken = jwt.sign({ username: dbuser.username },process.env.SECRET_KEY,{ expiresIn: '1d' });
        //send res
        res.send({message:"login success",token:signedToken,user:dbuser,});
      }
    }
  })
);

//get articles of all authors
userApp.get("/articles",verifyToken,expressAsyncHandler(async (req, res) => {
    //get all articles
    let articlesList = await dbobj.articlescollection.find({ status: true });
    //send res
    res.send({ message: "articles", payload: articlesList });
  })
);1

//post comments for an arcicle by atricle id
userApp.post("/comment/:articleId",verifyToken,expressAsyncHandler(async (req, res) => {
    //get user comment obj
    const userComment = req.body;
    const articleIdu=Number(req.params.articleId);
    //insert userComment object to comments array of article by id
    await dbobj.articlescollection.updateOne({ articleId: articleIdu},{ $addToSet: { comments: userComment } }
    );
    let article=await dbobj.articlescollection.findOne({articleId:articleIdu})
    res.send({ message: "Comment posted" ,payload:article.comments});
  })
);

//export userApp
module.exports = userApp;