//: import mongoose (model is created using mongoose)
const mongoose = require('mongoose')

//:import validator
const validator = require('validator')

//:import bcrypt Passwordhasher
const bcrypt = require('bcryptjs')


//:create schema - using schema class in mongoose
const candidateSchema = new mongoose.Schema({
    username:{
        type:'String',
        require:true,
        min:['3','Must be atleast 3 characters, got only {value}']
    },
    email:{
        type:'String',
        require:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email')
            }
        }
    },
    password:{
        type:'String',
        require:true,
        validator(value) {
            if (value.length < 8) {
                throw new Error('Password must be at least 8 characters long');
            }

            if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value)) {
                throw new Error('Password must contain at least one special character');
            }
            if (!/\d/.test(value)) {
                throw new Error('Password must contain at least one number');
            }
        }
    },
    profile:{
        type:'String'
    }
})


//:Create modal
const candidates = mongoose.model("candidates",candidateSchema)


//:export the model
module.exports = candidates