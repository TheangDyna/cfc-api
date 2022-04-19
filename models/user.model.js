const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;