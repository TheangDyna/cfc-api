const mongoose = require('mongoose');
const communitySchema = new mongoose.Schema({
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    category: [
        {
            type: String,
            enum: ['hot', 'event', 'holiday', 'scholaship', 'job', 'tip', 'other'],
            default: 'other'
        },
    ],
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    vote: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
    ],
    answer: [
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
            },
            vote: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'users',
                },
            ],
        },
    ],
    share: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
    },
}, { timestamps: true })

const CommunitiesModel = mongoose.model('communities', communitySchema);

module.exports = CommunitiesModel;