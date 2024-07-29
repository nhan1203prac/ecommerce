const mongoose = require('mongoose');

const { Schema } = mongoose
const ProductSchema = new Schema({
    name:{
        type:String,
        required:[true,"Can't be blank"],
        
    },
    description:{
        type:String,
        required:[true,"Can't be blank"],
    },
    
    price:{
        type:Number,
        required:[true,"Can't be blank"],
    },
    category:{
        type:String,
        required:[true,"Can't be blank"],
    },
    pictures:{
        type:Array,
        required:true
    },
    


},{minimize:false})

module.exports = mongoose.model('Product',ProductSchema)