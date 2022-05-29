const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fristName: {
        type: String,
        // required: [true, 'first name is required'],
    },
    lastName: {
        type: String,
        // required: [true, 'last name is required'],
    },
    gender: {
        type: String,
        // required: [true, 'gender is required'],
    },
    email: {
        type: String,
        required: [true, 'eamil is required'],
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },

    //optional document
    profileName: {
        type: String,
    },
    birthdate: {
        type: String,
    },
    grade: {
        type: String, // join by code
    },
    contact: {
        type: String,
    },
    status: {
        type: Array,
    },
    bio: {
        type: String,
    },
    favorite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'news',
    },

    //role
    role: {
        type: String,
        enum: ['user', 'teacher', 'admin'],
        default: 'user',
    },
}, { timestamps: true });

const UsersModel = mongoose.model('users', userSchema);

module.exports = UsersModel;