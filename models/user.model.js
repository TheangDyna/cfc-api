const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    },
},{timestamps: true});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel