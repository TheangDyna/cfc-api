const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    category: {
            type: String,
            enum: ['Hot', 'Event', 'Holiday', 'Scholarship', 'Job', 'Tip'],
        },
    coverName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    interesting: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
    ],
    share:  [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
    ],
}, { timestamps: true })

const EventsModel = mongoose.model('events', eventSchema);

module.exports = EventsModel;