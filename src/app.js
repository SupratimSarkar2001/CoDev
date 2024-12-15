const express = require("express");
const {connectDB} = require("./config/database");
const cookieParser = require('cookie-parser')
const app = express();
const PORT = 8080;
const { authRouter } = require("./routes/auth.routes");
const { profileRoute } = require("./routes/profile.routes");
const { connectionRequestRouter } = require("./routes/connectionRequest.routes");
const { userRouter } = require("./routes/user.routes");

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

/*Routes*/
app.use("/auth", authRouter);
app.use("/profile", profileRoute);
app.use("/connectionRequest",connectionRequestRouter)
app.use("/user", userRouter)

module.exports ={
 app
}