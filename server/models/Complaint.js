const mongoose = require("mongoose");
const complaintSchema =  new mongoose.Schema({
    location:{
        type:String,
        required:true,
     },
     photo:{ 
        type:String,
        required:false,
     },
    
    description:{
        type:String,
        required:true,
     },
     title:{
        type:String,
        required:true,
     },
    type:{
        type:String,
        required:true,
    },
    
    
     status:{
        type:String,
        enum:['Pending', 'Solved', 'Working', 'Rejected'],
        default:'Pending'
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:false
    },
});
complaintSchema.set("timestamps" , true);

const complaints =  mongoose.model("complaints" , complaintSchema);
module.exports = complaints;