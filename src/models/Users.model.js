const {Schema,model} = require("mongoose");

const userSchema = new Schema({
 firstName:{
  type: String,
 },
 lastName:{
  type: String,
 },
 email:{
  type: String,
  unique: true,
 },
 password:{
  type: String,
 },
 age:{
  type: Number,
 }
});

const User = model("User",userSchema);

module.exports = {User};