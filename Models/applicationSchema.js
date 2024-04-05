const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    jobId: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const applications = mongoose.model("applications", applicationSchema);

module.exports = applications;