const {app} = require("../app");

/*
For any REST call behind the scenes there is a TCP connection.
that takes one request and sends one response and then the connection is closed.
*/
app.get("/test",
 (req, res) => {
 res.send("This Function is called request handler");
 },
 (req, res) =>{
  res.send("This Function is called request handler 2");
 }
)

/*
Using next() we can call the next middleware function 
*/
app.get("/test2",
 (req, res, next) => {
 console.log("This Function is called middleware");
 next();
 },
 (req, res) =>{
  res.send("This Function is called request handler 2");
 }
)

/* Edge case */
app.get("/test3",
 (req, res, next) => {
 console.log("This Function is called middleware");
 next();
 res.send("I am returning from the middleware"); // as next() is called after this line it will not be executed because the TCP connection is closed 
 },
 (req, res) =>{
  console.log("This Function is called request handler 2");
  res.send("This Function is called request handler 2");
 }
)

app.get("/test4",
 (req, res, next) => {
 console.log("This Function is called middleware");
 next();
 },
 (req, res,next) =>{
  console.log("This Function is called middleware 2");
  next(); // there is no request handler after this middleware so it will show error
 }
)

/* Another style of writing middleware and request handler -- Independent Middleware */

app.get("/test5",(req,res, next)=>{
 console.log("This Function is called middleware");
 next();
})

app.get("/test5",(req,res, next)=>{
 console.log("This Function is called middleware 2"); 
 next(); 
})

app.get("/test5",(req,res)=>{
 console.log("This Function is called request handler");
 res.send("This Function is called request handler");
})