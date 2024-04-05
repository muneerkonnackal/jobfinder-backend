const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({
    id:{
        type: 'String',
    },
    offerImage:{
        type : 'String',
        required: true
    },
    url:{
        type : 'String',
        required: true
    },
    basicPlan:{
        type : 'String',
        
    },
    standardPlan:{
        type : 'String',
    },
    classicPlan:{
        type : 'String'
    }
})

const offers = mongoose.model("offers",offerSchema)
module.exports = offers;