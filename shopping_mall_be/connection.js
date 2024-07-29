require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ecommerce',{useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>console.log("Connected to mongoosedb"))
.catch((err)=>console.log(err))