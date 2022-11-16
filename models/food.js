const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const foodSchema= new Schema({
name:{type:String, required:true},
description:{type:String, required:true},
price:{type: Number, required:true},
img: {type:String}
})

foodSchema.index(
    {name:1},
    {unique:true}
);


const food=mongoose.model('food',foodSchema);

module.exports=food;