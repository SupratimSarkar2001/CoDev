const jwt = require("jsonwebtoken");
const { User } = require("../models/Users.model");
const JWT_SECRET ="BSJsdguIGUBUHHBJbJHuIBJBGdgwd"

const userAuth = async (req,res,next) =>{
 try{
  const cookies = req.cookies;
  const {token} = cookies;
 
  if(!token){
   throw new Error("No User Token")
  }
 
  const {_id,firstName} = jwt.verify(token,JWT_SECRET);
  const user = await User.findById(_id);
 
  if(!user){
   throw new Error("No User Found");
  }
  req.user = user;
 
  next();
 }
 catch(error){
  res.status(401).send("Unauthorized",error);
 }
}

module.exports ={userAuth};