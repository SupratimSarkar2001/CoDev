const e = require("express");
const {Schema,model} = require("mongoose");
const validator = require("validator");

const userSchema = new Schema({
 firstName:{
  type: String,
  required: true,
  trim: true,
  maxLength: 20,
  minLength: 2
 },
 lastName:{
  type: String,
  required: true,
  trim: true,
  maxLength: 20, 
  minLength: 1
 },
 email:{
  type: String,
  unique: true,
  required: true,
  lowercase: true,
  trim: true,
  validate(value){
   if(!validator.isEmail(value)){
    throw new Error("Invalid Email");
   }
  }
 },
 password:{
  type: String,
  required: true,
  validate(value){
   if(!validator.isStrongPassword(value)){
    throw new Error("Weak Password");
   }
  }
 },
 photoUrl:{
  type: String,
  default: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
  validate(value){
   if(!validator.isURL(value)){
    throw new Error("Invalid URL");
   }
  }
 },
 age:{
  type: Number,
  min:14
 },
 gender:{
  type: String,
  enum:["Male","Female","Others"]
 },
 about:{
  type: String,
  default:"I am a Coder"
 },
 skills:{
  type: [String]
 }
});

const User = model("User",userSchema);

module.exports = {User};