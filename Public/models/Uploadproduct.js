const mongoose=require("mongoose");
const Schema=mongoose.Schema;
let Product=new Schema({
    Product_id:{type:String},
    Product_name:{type:String},
    cotegory:{type:String},
    type:{type:String},
    description:{type:String},
    price:{type:Number},
    category:{type:String},
    type:{type:String},
    imagelink:{type:String}
    
});

module.exports=mongoose.model("Product",Product);   