const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    generation: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    student: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        }
    ],

}, { timestamps: true });

const StudentsModel = mongoose.model('students', studentSchema);

module.exports = StudentsModel;