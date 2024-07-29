const express = require('express')
const app = express()
require('./connection')
const cors = require('cors')
const http = require('http')
const stripe = require('stripe')("sk_test_51P5IjLP1PtyodjX4QVY760xOBAmkJBWxzOWLQr4dujuFVMxWbMZkHGMZUkDwg3k4F5hiR7NCVt1SdBRiK6ix7ZB300PZx6CwkS")

const server = http.createServer(app);
const {Server} = require('socket.io')
const userRoute = require('./routes/userRoutes')
const productRoute = require("./routes/productRoutes")
const imageRoute = require("./routes/imageRoutes")
const orderRoute = require("./routes/orderRoutes")
const io = new Server(server,{
    cors:'http://localhost:3001',
    methods:["GET","PUT","PATCH","DELETE"]
})

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/users",userRoute)
app.use("/products",productRoute)
app.use("/orders",orderRoute)
app.use('/images/imgload',imageRoute)

app.post("/create-payment",async(req,res)=>{
    const {amount} = req.body
    console.log(amount)
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method_types: ['card']
          });
          res.status(200).json(paymentIntent)
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
})
server.listen(8080,()=>{
    console.log('server is running at port',8080)
})
app.set('socketio',io)