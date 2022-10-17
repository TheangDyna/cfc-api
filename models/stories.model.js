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
            enum: ['Hot', 'Event', 'Holiday', 'Scholarship', 'Job', 'Tip'],
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