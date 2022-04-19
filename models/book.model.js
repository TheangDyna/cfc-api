const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    author: {
        type: String,
    },
    year: {
        type: Number,
    },
    price: {
        type: Number,
        required: true,
    },
   
},{timestamps: true});

const UserModel = mongoose.model('books', UserSchema);

module.exports = UserModel;