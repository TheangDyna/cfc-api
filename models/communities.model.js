const mongoose = require('mongoose');
const communitySchema = new mongoose.Schema({
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    category: {
        type: String,
        enum: ['Hot', 'Event', 'Holiday', 'Scholarship', 'Job', 'Tip'],
    },
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
            createBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
            },
            answer: {
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
    share:  [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

const CommunitiesModel = mongoose.model('communities', communitySchema);

module.exports = CommunitiesModel;