const mongoose = require('mongoose');

const citySchema = mongoose.Schema({
    city: String,
    State: String,
    Activity: String
    });
    
    module.exports = mongoose.model('City', citySchema)