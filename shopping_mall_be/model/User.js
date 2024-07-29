const mongoose = require('mongoose');

const { Schema } = mongoose
const bcrypt = require('bcrypt')
const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true,
        validate:{
            validator:function(str){
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(str)
            },
            message:props=>`${props.value} is not a valid email`
        }
    },
    
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    cart:{
        type:Object,
        default:{
            total:0,
            count:0
        }
    },
    notifications:{
        type:Array,
        default:[],

    },
    orders:[{type:mongoose.Schema.Types.ObjectId,ref:'Order'}]


},{minimize:false})

module.exports = mongoose.model('User',userSchema)