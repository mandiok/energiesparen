const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: String,
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    user_name: {
        type: String,
        unique: true
    },
    password: String,
    url: String,
    message: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;