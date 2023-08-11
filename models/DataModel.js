const mongoose = require('mongoose');
const dataSchema =  new mongoose.Schema({
    user:{type:String,required:true},
    image:{type:String,required:true},
    title:{type:String,required:true},
    description:{type:String,required:true},
    rating:{type:Number,required:true},
    
},
{
    versionKey:false,
})


const DataModel = mongoose.model("data",dataSchema);

 module.exports={
    DataModel,
 };