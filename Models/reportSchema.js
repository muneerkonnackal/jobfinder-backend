const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    userId:{
        type : String,
    },
    jobId:{
        type: String
    },
    topic:{
        type: String,
        require:true
    },
    message:{
        type: String,
        require:true
    },
    date: {
        type: Date,
        default: Date.now
    }

})

const complaints = mongoose.model("complaints",reportSchema)
module.exports = complaints