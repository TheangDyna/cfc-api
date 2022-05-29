const mongoose = require('mongoose');
const newsSchema = new mongoose.Schema({
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        // required: true, need required when test with auth
    },
    category: [
        {
            type: String,
            enum: ['hot', 'event', 'holiday', 'scholaship', 'job', 'tip', 'other'],
        },
        // default: 'other',
    ],

    //optional document but between coverName and title can not empty one
    coverName: [
        {
            type: String,
        },
    ],
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    react: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
    ],
    comment: [
        {
            _id: {
                type: String,
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
            },
            text: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now,
            }
        },
    ],
    share: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
    },
}, { timestamps: true })

const NewsModel = mongoose.model('news', newsSchema);

module.exports = NewsModel;