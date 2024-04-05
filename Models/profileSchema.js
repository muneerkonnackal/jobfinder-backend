const mongoose = require('mongoose');
//:import validator
const validator = require('validator')

const profileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    skills: {
        type: [String]
    },
    resumepdf: {
        type: String,
        required:true
    },
    profileImage: {
        type: String
    },
    profession: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        min: [10, 'Must be at least 10 characters'],
        max: [10, 'Must be at most 10 characters']

    },
    location: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    userId:{
        type:String,
        require:true
    }
});

const profiles = mongoose.model("profiles", profileSchema);

module.exports = profiles;