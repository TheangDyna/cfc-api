const mongoose = require('mongoose');
const storySchema = new mongoose.Schema({
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    category: {
            type: String,
            enum: ['hot', 'event', 'holiday', 'scholarship', 'job', 'tip', 'other'],
            default: 'other',
        },
    coverName: [
        {
            type: String,
            require: true,
        },
    ],
    description: {
        type: String,
    },
}, { timestamps: true });

const StoriesModel = mongoose.model('stories', storySchema);

module.exports = StoriesModel;