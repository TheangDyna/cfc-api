const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    //required document
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    //optional document
    profileName: {
        type: String,
    },
    birthdate: {
        type: String,
    },
    class: {
        type: String, // join by code
    },
    contact: {
        type: String,
    },
    status: {
        type: Array, //not sure check later
    },
    bio: {
        type: String,
    },
    major: {
        type: String,
    },
    job:{
        type: String,
    },
    address: {
        type: String,
    },
    description: {
        type: String,
    },
    favorite: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'news',
        }
    ],

    //role
    role: {
        type: String,
        enum: ['user', 'teacher', 'admin'],
        default: 'user',
    },
}, { timestamps: true });

const UsersModel = mongoose.model('users', userSchema);

module.exports = UsersModel;