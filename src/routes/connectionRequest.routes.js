const express = require("express");
const { User } = require("../models/Users.model");
const { userAuth } = require("../middlewares/auth.middleware");
const { ConnectionRequest } = require("../models/ConnectionRequest.model");

const connectionRequestRouter = express.Router();

connectionRequestRouter.post("/:status/:toId",userAuth, async (req,res)=>{
 try{
  const allowedStatus = ["fail","pass"];
  const { status,toId } = req.params;
 
  if(!allowedStatus.includes(status)){
   throw new Error("This Status is Not allowed")
  }

  const toUser = await User.findOne({_id:toId});

  if(!toUser){
   throw new Error("This User is not Present");
  }

  const loggedUser = req.user;
  const fromId = loggedUser._id;

  const presentConnectionRequest = await ConnectionRequest.find({
   $or: [
     { fromId: fromId, toId: toId },
     { fromId: toId, toId: fromId }
   ]
 });
 
 if(presentConnectionRequest.length>0){
  throw new Error("Existing Connection Detected");
 }

 const connectionRequestInstance = new ConnectionRequest({
  fromId,
  toId,
  status:status
 })

 await connectionRequestInstance.save();

 res.status(201).send("New Connection has Send")

 }
 catch(error){
  res.status(400).send("Sending Connection Request Faild" + error);
 }
})

connectionRequestRouter.post("/pending/:status/:requestId",userAuth, async(req,res)=>{
  try{
    const loggedUser = req.user;
    const {status, requestId} = req.params;

    const allowedStatus = ['accepted', 'rejected'];

    if(!allowedStatus.includes(status)){
      throw new Error("This Status is not allowed");
    }

    const pendingConnectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toId: loggedUser._id,
      status: 'pass'
    })

    if(!pendingConnectionRequest){
      throw new Error("No Pending request by this id");
    }

    pendingConnectionRequest.status = status;

    await pendingConnectionRequest.save();

    res.send("Approved/Reject Successfull")
  } 
  catch(error){
    res.status(400).send("Approving/Rejecting Connection Request Failed"+ error)
  }
})

module.exports={
 connectionRequestRouter
}