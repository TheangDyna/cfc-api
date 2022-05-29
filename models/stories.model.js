const mongoose = require('mongoose');
const storySchema = new mongoose.Schema({
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        // required: true, need required when test with auth
    },
    title: {
        type: String,
        required: true,
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