const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
username: {type: String, unique: true, required: true},
email: String,
password: String
});

module.exports = mongoose.model('User', userSchema)