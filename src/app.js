const express = require("express");
const {connectDB} = require("./config/database");
const app = express();
const PORT = 8080;
const {User} = require("./models/Users.model");

/*Start the server*/

connectDB().then(()=>{
 app.listen(PORT,()=>{
  console.log(`Server is up on port ${PORT}`);
 })
}).catch((error)=>{
 console.log("Some Error while connecting to database and starting server",error);
})

app.post("/users",async (req,res)=>{
 try{
   const UserInstance = {
     firstName:"Supratim",
     lastName:"Sarkar",
     email:"9d6dL@example.com",
     password:"Supratim8",
     age:20
   }
   const user = new User(UserInstance);
   await user.save();
   res.status(201).send("User Added Successfully");
 }
 catch(error){
  res.status(500).send("Adding User Failed");
 }
})
module.exports ={
 app
}