//create user api app
const exp = require("express");
const userApp = exp.Router();
const bcryptjs = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const verifyToken=require('../Middlewares/verifyToken')
require("dotenv").config();

let userscollection;
let articlescollection;
userApp.use((req, res, next) => {
  userscollection = req.app.get("userscollection");
  articlescollection = req.app.get("articlescollection");
  next();
});

//user registration route
userApp.post("/new-user",expressAsyncHandler(async (req, res) => {
    //get user resource from client
    const newUser = req.body;
    //check for duplicate user based on username
    const dbuser = await userscollection.findOne({ username: newUser.username });
    if (dbuser !== null) {
      res.send({ message: "User already existed" });
    } else {
      newUser.password = await bcryptjs.hash(newUser.password, 5);
      //create user
      await userscollection.insertOne(newUser);
      //send res
      res.send({ message: "User created" });
    }
  })
);

//user login
userApp.post("/login",expressAsyncHandler(async (req, res) => {
    //get usercred obj 
    const userCred = req.body;
    const dbuser = await userscollection.findOne({
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
        const signedToken = jwt.sign({ username: dbuser.username },process.env.SECRET_KEY,{ expiresIn: 20 });
        //send res
        res.send({message: "login success",token: signedToken,user: dbuser,});
      }
    }
  })
);

//get articles of all authors
userApp.get("/articles",verifyToken,expressAsyncHandler(async (req, res) => {
    //get all articles
    let articlesList = await articlescollection.find({ status: true }).toArray();
    //send res
    res.send({ message: "articles", payload: articlesList });
  })
);

//post comments for an arcicle by atricle id
userApp.post("/comment/:articleId",verifyToken,expressAsyncHandler(async (req, res) => {
    //get user comment obj
    const userComment = req.body;
    const articleIdu=req.params.articleId;
    //insert userComment object to comments array of article by id
    await articlescollection.updateOne({ articleId: articleIdu},{ $addToSet: { comments: userComment } }
    );
    res.send({ message: "Comment posted" });
  })
);

//export userApp
module.exports = userApp;