const mongoose=require("mongoose");
var Schema=mongoose.Schema;
let ProductSchema=new Schema({
    Product_id:{type:String},
    Product_name:{type:String},
    imagelink:{type:String}
    
});

module.exports=mongoose.model("Products",ProductSchema);   