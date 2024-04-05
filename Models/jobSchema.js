const mongoose = require('mongoose');
const { toString } = require('validator');

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    qualification: {
        type: String
    },
    lastdate: {
        type: String
    },
    typeofworker: {
        type: String
    },
    expsalary: {
        type: String
    },
    location: {
        type: String
    },
    worktype: {
        type: String
    },
    companylogo: {
        type: String
    },
    userId:{
        type:String,
        require:true
    }

},{timestamps:true});

const jobs = mongoose.model("jobs", jobSchema);

module.exports = jobs;