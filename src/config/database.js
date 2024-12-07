const MONGO_URI = 'mongodb+srv://Supratim:Supratim8@cluster0.j6dwu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const DB_NAME = 'codev'

const mongoose = require('mongoose');

const connectDB = async () => {
 try{
   const mongoConnection =await mongoose.connect(`${MONGO_URI}`, {dbName: DB_NAME});
   console.log("Database Connected Successfully");
 }
 catch(error){
  console.warn("Database Connection Failed",error)
 }
}

module.exports = {connectDB};