const express = require("express");
const { userAuth } = require("../middlewares/auth.middleware");
const { ConnectionRequest } = require("../models/ConnectionRequest.model");

const userRouter = express.Router();

userRouter.get("/pendingRequest", userAuth, async (req,res)=>{
  try{
   const loggedUser = req.user;
   const pendingRequest = await ConnectionRequest.find({
    toId: loggedUser._id,
    status: 'pass'
   }).populate("fromId", ["firstName","lastName", "photoUrl"])

   res.send(pendingRequest);
  }
  catch(error){
   res.status(400).send("Failed to fetch pending Request"+ error)
  }
})

userRouter.get("/allConnection", userAuth, async (req,res)=>{
 try{
  const loggedUser = req.user;
  const allConnection = await ConnectionRequest.find({
   $or:[
    {fromId:loggedUser._id,status:'accepted'},
    {toId:loggedUser._id,status:'accepted'}
   ]
  })
  .populate("fromId",["firstName","lastName","age","gender","photoUrl","about","skills"])
  .populate("toId",["firstName","lastName","age","gender","photoUrl","about","skills"])

  let data = allConnection.map((key)=>{
   if(key.fromId._id.toString() === loggedUser._id.toString()){
    return key.toId;
   }
   return key.fromId;
  })

  return res.send({data})
 }
 catch(error){
  res.status(400).send("Failed to fetch all Connection"+ error)
 }
})
module.exports = {
 userRouter
}

