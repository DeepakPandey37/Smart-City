const mongoose = require("mongoose");
const Userschema = new mongoose.Schema({
 fullname :{
    type:String,
    required:true,
 },
 email :{
    type:String,
    required:true,
 },
 password :{
    type:String,
    required:true,
 },
 phonenumber :{
    type:Number,
    required:true,
 },
 role:{
    type: String,
    enum:['citizen', 'admin'],
    required:true,
   }, 
   profile:{
    bio:{type:String},
    complaint:{type:mongoose.Schema.Types.ObjectId, ref:'Complaint'},
    profilePhoto:{
        type:String,
        default:"",
        required:false
    },
    
   }, 
    
},{timestamps:true});

const User = mongoose.model("User", Userschema);
module.exports= User;