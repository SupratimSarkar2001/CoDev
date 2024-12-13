const express = require('express');
const validator = require("validator");
const bcrypt = require("bcrypt")


const { singUpValidation } = require('../helpers/validation.helpers');
const { User } = require('../models/Users.model');

const authRouter = express.Router();

authRouter.post("/signup",async (req,res)=>{
 const UserInstance = req.body; 

 try{
   singUpValidation(UserInstance);

   const password = UserInstance.password;

   const isStrongPassword = validator.isStrongPassword(password);
   if(!isStrongPassword){
    throw new Error("Password is not strong enough");
   }

   const passwordHash = await bcrypt.hash(password,10);

   UserInstance.password = passwordHash;

   const user = new User(UserInstance);
   await user.save();
   res.status(201).send("User Added Successfully");
 }
 catch(error){
  res.status(500).send("Adding User Failed "+ error.message);
 }
})

authRouter.post("/login",async (req,res)=>{
 const email = req.body.email;
 const password = req.body.password;
 try{
   const user = await User.findOne({email:email});
   
   if(!user){
     throw new Error("Invalid Credentials");
   }

   const isValidPassword = await user.isPasswordValid(password);

   if(!isValidPassword){
     throw new Error("Invalid Credentials");
   }

   const token = await user.generateJWTToken();

   res.cookie("token", token)
   return res.send("Login successful User: " + user)
 }
 catch(error){
   res.status(400).send("Login Failed "+error.message);
 }
})

module.exports = {
 authRouter
}