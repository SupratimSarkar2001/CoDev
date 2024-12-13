const express = require("express");
const { userAuth } = require("../middlewares/auth.middleware");

const profileRoute = express.Router();

profileRoute.get("/view",userAuth,async (req,res)=>{
 try{
   const user = req.user;
   res.send(user)
 }
 catch(error){
   res.status(400).send("Getting Profile Fails :"+error)
 }
})


module.exports = {
 profileRoute
}