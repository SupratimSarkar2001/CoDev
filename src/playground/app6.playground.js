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