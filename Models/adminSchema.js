//: import mongoose (model is created using mongoose)
const mongoose = require('mongoose')

//:import validator
const validator = require('validator')


//:create schema - using schema class in mongoose
const adminSchema = new mongoose.Schema({
    username:{
        type:'String',
        require:true,
        min:['3','Must be atleast 3 characters, got only {value}']
    },
    email:{
        type:String,
        require:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email')
            }
        }
    },
    password:{
        type:String,
        require:true
    },
    company:{
        type:String
       
    },
    designation:{
        type:String
       
    },
    profile:{
        type:String 
    },
    userId:{
        type:String,
        require:true
    }

})


//:Create modal
const admins = mongoose.model("admins",adminSchema)


//:export the model
module.exports = admins