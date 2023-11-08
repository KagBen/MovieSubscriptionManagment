const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username : String ,
    password : String, 
    role:String,
    sessionTimeOut:Number ,//in minutes,
    createdDate:Date,
    userInfo : {firstName:String, lastName:String},
    permissions:[String]
}, { versionKey: false });

const User = mongoose.model("User",userSchema ,"Users" )

module.exports = User;
