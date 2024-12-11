const express = require("express");
const {connectDB} = require("./config/database");
const bcrypt = require('bcrypt');
const validator = require("validator");
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 8080;
const {User} = require("./models/Users.model");
const {singUpValidation} = require("./helpers/validation.helpers");

const JWT_SECRET ="BSJsdguIGUBUHHBJbJHuIBJBGdgwd"

app.use(express.json()); //Middleware - to parse the request body -- JSON to JS Object
app.use(cookieParser());

/*Start the server*/

connectDB().then(()=>{
 app.listen(PORT,()=>{
  console.log(`Server is up on port ${PORT}`);
 })
}).catch((error)=>{
 console.log("Some Error while connecting to database and starting server",error);
})

/* User APIS */
app.post("/signup",async (req,res)=>{
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

app.post("/login",async (req,res)=>{
  const email = req.body.email;
  const password = req.body.password;
  try{
    const user = await User.findOne({email:email});
    
    if(!user){
      throw new Error("Invalid Credentials");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword){
      throw new Error("Invalid Credentials");
    }

    const token = await jwt.sign({_id: user._id, firstName:user.firstName },JWT_SECRET)

    res.cookie("token", token)
    return res.send("Login successful User: " + user)
  }
  catch(error){
    res.status(400).send("Login Failed "+error.message);
  }
})

app.get("/profile", async (req,res)=>{
  try{
    const cookies = req.cookies; 
    const {token} = cookies;

    const {_id, firstName} = await jwt.verify(token, JWT_SECRET);
    
    console.log(_id, firstName);
    const user =  await User.findById(_id);
    res.send(user)
  }
  catch(error){
    res.status(400).send("Getting Profile Fails :"+error)
  }
})

app.get("/users", async (req,res)=>{
  const email = req.query.email;
  try{
   const users = await User.find({email:email});

   if(users.length === 0){
    return res.status(404).send(`User with ${email} does not exist`);
   }

   return res.status(200).send(users);
  }
  catch(error){
   res.status(500).send("Getting User Failed");
  }
})

app.get("/feed", async (req,res)=>{
  try{
    const allUsers = await User.find({});
    return res.status(200).send(allUsers);
  }
  catch(error){
    res.status(500).send("Getting Feed Failed");
  }
})

app.delete("/users", async (req,res) =>{
  const userId = req.body.userId;
  try{
    await User.findByIdAndDelete(userId);
    return res.status(200).send("User Deleted Successfully");
  }
  catch(error){
    res.status(500).send("Deleting User Failed");
  }
})

//PUT - Entire update
//PATCH - Partial update
app.patch("/users", async (req,res) => {
  console.log("Trying to update user");
  const updatedUserInstance = req.body;
  const userId = req.query.userId;
  const UPDATEABLE_FIELDS = ["about","skills"];
  try{

    if(!Object.keys(updatedUserInstance).every(key => UPDATEABLE_FIELDS.includes(key))){
      throw new Error("Only about and skills can be updated");
    }

    if(req.body?.skills?.length>30){
      throw new Error("Skills cannot be more than 30");
    }

    if(req.body?.about?.length>200){
      throw new Error("About cannot be more than 200");
    }

    if(updatedUserInstance?.skills?.length && updatedUserInstance?.skills?.length !== new Set(updatedUserInstance?.skills).size){
      throw new Error("Skills must have unique values");
    }

    await User.findByIdAndUpdate(userId,updatedUserInstance);
    return res.status(200).send("User Updated Successfully");
  }  
  catch(error){
    res.status(500).send("Updating User Failed");
  }
})

module.exports ={
 app
}