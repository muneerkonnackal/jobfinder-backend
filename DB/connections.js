//:import mongoose
const mongoose = require('mongoose')

//:connection string of mongoose
const connectionString = process.env.DATABASE

//:connect to mongoDB using mongoose
mongoose.connect(connectionString).then((res)=>{
    console.log('mongoDB connected successfully');
}).catch((err)=>{
    console.log(`mongoDB connection failed due to :${err}`);
})