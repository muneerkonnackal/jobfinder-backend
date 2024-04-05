
//:1] impoprt dotenv
require('dotenv').config()

//:2] import express
const express = require('express')

//:3] import cors
const cors = require('cors')

//:import router
const router = require('./Router/router')

//:import connection.js file or mongoose
require('./DB/connections')

//:import razorpay
const Razorpay = require('razorpay')
const instance = new Razorpay({
    key_id:process.env.KEYID,
    key_secret:process.env.SECRETKEY,
})

//:4] create server
const jpServer = express()

// jpServer.use(express.static('uploads/images'))

//:5] use of cors by server
jpServer.use(cors())

//:6] Returns middleware that only parses json and converts into javascript object
jpServer.use(express.json())

jpServer.use(express.urlencoded({extended: false}))

//: Server use router
jpServer.use(router)

jpServer.use('/uploads', express.static('uploads'));
// jpServer.use(express.static('uploads/pdfs'));

//:7] custom the port
const PORT = 4000 || process.env.PORT

//:8] run the server
jpServer.listen(PORT,()=>{
    console.log(`SERVER RUNNING SUCCESSFULLY AT PORT NUMBER ${PORT}`);
})

//:9] get http request to baseURL -http://localhost:4000/ 
jpServer.get('/',(req,res)=>{
    res.send(`<h1 style="color:blue" ><span style="color:red">Job Portal Server</span> running successfully and waiting for client request</h1>`)
})