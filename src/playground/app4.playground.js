const {app} = require("../app");

/*
Consider the follwing Endpoints can be admin
- admin/getAllData
- admin/deleteAllData

So before doing any operation we need to check if the user is admin or not(Authentication)
Using middleware we can check if the user is admin or not once and then use it in all the endpoints
 */

app.use("/admin", (req, res, next) => {
 const token = 'XYZ'
 const isAuthenticatedAdmin = token === 'XYZ';
 if(isAuthenticatedAdmin){
  next();
 }else{
  res.status(401).send("Unauthorized");
 }
})

app.get("/admin/getAllData", (req, res) => {
 res.send("Expected Result: Response will be fetched with admin/getAllData");
})

app.delete("/admin/deleteAllData", (req, res) => {
 res.send("Expected Result: Response will be fetched with admin/deleteAllData");
})

/*
Consider that following Endpoints User can access when he is authenticated
- user/getAllData

And following Endpoints User can access when he is not authenticated
- user/login
*/

const isAuthenticated = (req, res, next) => {
 const token = 'XYZ'
 const isAuthenticatedAdmin = token === 'XYZ';
 if(isAuthenticatedAdmin){
  console.log("User is authenticated");
  next();
 }else{
  res.status(401).send("Unauthorized");
 }
}

app.get("/user/getAllData",
 isAuthenticated,
 (req,res)=>{
 res.send("Expected Result: Response will be fetched with user/getAllData");
})

app.get("/user/login",(req,res)=>{
 res.send("Expected Result: Response will be fetched with user/login");
})