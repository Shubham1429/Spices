const mongoose=require("mongoose");
const Schema=mongoose.Schema;
let ShopSchema=new Schema({
    Email : String ,
    Starter : Array, 
    Oriental : Array,  
    Chat_Display: Array,
    South: Array,
    Soup: Array,
    Salads: Array, 
    Cont_past: Array,
    Pasta: Array,
    Roasti: Array,
    Indian: Array,
    Daal: Array,
    Breads: Array,
    Amritsar: Array,
    Rajasthani: Array,
    Mexican: Array,
    Chinese: Array,
    Deserts: Array,
    Chin_Deserts: Array,
    Fruits: Array
});

module.exports=mongoose.model("CShop",ShopSchema);   