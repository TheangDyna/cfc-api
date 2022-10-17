const mongoose = require('mongoose');
const newsSchema = new mongoose.Schema({
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    category: {
        type: String,
        enum: ['Hot', 'Event', 'Holiday', 'Scholarship', 'Job', 'Tip'],
    },

    // optional document but between coverName and title can not empty one
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
            required: true,
        },
    ],
    comment: [
        {
            _id: {
                type: String,
                required: true,
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                default: Date.now,
            }
        },
    ],
    share: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
    ],
}, { timestamps: true })

const NewsModel = mongoose.model('news', newsSchema);

module.exports = NewsModel;