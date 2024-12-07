const {app} = require("../app");

/*
 Error Handling is a crucial part of a web application, we should use try-catch to handle errors in every API call
 But also for some unexpected errors we can use middleware to handle them
 we must add this Global error handler at the end of the middleware stack
*/ 


app.get("/getUnexpectedError", (req, res) => {
 throw new Error("Unexpected Error");
})

/* Global error handler */
app.use("/",(err, req, res, next)=>{
 res.status(500).send("Internal Server Error");
})