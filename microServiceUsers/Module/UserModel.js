const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username : {
        type: String,
        unique: true, // Set the field as unique
        required: true, // You can also make it required if needed
      }, 
    password : String, 
    role:String,
    sessionTimeOut:Number ,//in minutes,
    createdDate:Date,
    userInfo : {firstName:String, lastName:String},
    permissions:[String]
}, { versionKey: false });

const User = mongoose.model("User",userSchema ,"Users" )

module.exports = User;
