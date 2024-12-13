const express = require("express");
const validator = require("validator")
const bcrypt = require("bcrypt")
const { userAuth } = require("../middlewares/auth.middleware");
const { profileEditOptionValidation } = require("../helpers/validation.helpers");

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

profileRoute.patch("/edit",userAuth, async (req,res)=>{
  try{
    const isValidProfileEditOptions = profileEditOptionValidation(req.body);
    if(!isValidProfileEditOptions){
      throw new Error("Fields are not valid to edit Profile")
    };

    const user = req.user;
    const userPath = req.body;
    Object.keys(userPath).forEach(key=>(user[key] = userPath[key]));

    await user.save();

    res.send("Update Succesfull" + user);
  }
  catch(error){
    res.status(400).send("Update Profile Failed" + error)
  }
})


profileRoute.patch("/forgetPassword", userAuth, async (req,res)=>{
  try{
    const user = req.user;
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
  
    const isValidCurrentPassword = await user.isPasswordValid(currentPassword);
  
    if(!isValidCurrentPassword){
      throw new Error("You don't have Permission, Please Check your Current Password")
    }
  
    const isStrongPassword = validator.isStrongPassword(newPassword);
    if(!isStrongPassword){
     throw new Error(" New Password is not strong enough");
    }
  
    const passwordHash = await bcrypt.hash(newPassword,10);
  
    user.password = passwordHash;
  
    await user.save();
  
    res.status(201).send("Password Save Successfully");
  }
  catch(error){
    res.status(400).send("Updating Password Fails :"+error)
  }
})

module.exports = {
 profileRoute
}