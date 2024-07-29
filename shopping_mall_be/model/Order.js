const mongoose = require('mongoose');

const { Schema } = mongoose

const OrderSchema = new Schema({
    products:{
        type:Object
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        default:'processing'
    },
    total:{
        type:Number,
        default:0
    },
    count:{
        type:Number,
        default:0
    },
    date: {
        type: String,
        default: new Date().toISOString().split('T')[0]
      },
      address: {
        type: String,
      },
      country: {
        type: String,
      }
}, {minimize: false})


module.exports = mongoose.model('Order', OrderSchema);