const express = require("express");

const app = express();
const PORT = 8080;

/*Start the server*/
app.listen(PORT,()=>{
 console.log(`Server is up on port ${PORT}`);
})

/*Health Check Endpoint*/
app.get("/health-check",(req,res)=>{
 res.send("Healthy Response");
})