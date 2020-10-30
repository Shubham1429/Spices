const mongoose=require("mongoose");
const Schema=mongoose.Schema;
let ContactSchema=new Schema({
    Name:{type:String},
    Phone:{type:Number},
    Email:{type:String},
    Message:{type:String}
    
});

module.exports=mongoose.model("CForm",ContactSchema);   