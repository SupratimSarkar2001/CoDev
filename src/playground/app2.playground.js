//In order to request on a API path we have GET,POST,PUT,PATCH,DELETE -- app.get,app.post,app.put,app.patch,app.delete

const {app} = require("../app");

// app.use() will match with get post put delete all request type
app.use("/test",(req,res)=>{
 res.send("Expected Result: Response will be fetched with test");
})


//app.use() will match all the request that starts with /test/hi is not present  still it matches with /test -- so app.use("/test") act as a fallback 


//while using app.use() order of execution is important
app.use("/test/hello",(req,res)=>{
 //Original Result : Response will be fetched with test -- as app.use get matches first and return its value  
 res.send("Expected Result: Response will be fetched with test/hello ");
})