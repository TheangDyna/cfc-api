const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    //required document
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    //optional document

    //bacsic info
    profile: {
        type: String,
    },
    gender: {
        type: String,
    },
    birthdate: {
        type: String,
    },
    currentAddress: {
        type: String,
    },
    homeTown: {
        type: String,
    },
    
    //education section
    education: {
        primary: {
            type: String,
        },
        secondary: {
            type: String,
        },
        high: {
            type: String,
        },
        university: [
          {
            status: {
                type: String,
                enum: ['studied', 'graduated'],
            },
            name: {
                type: String,
            },
            at: {
                type: String,
            },
            degreeLevel: {
                type: String,
                enum: ['bachelor', 'master', 'doctoral'],
            },
            major: {
                type: String,
            },
            startYear: {
                type: String,
            },
            // if studied
            currentYear: {
                type: String,
            },
            // if graduated
            endYear: {
                type: String,
            },
          },
        ],
        work: [
            {
                status: {
                    type: String,
                    enum: ['working', 'stopped'],
                },
                name: {
                    type: String,
                },
                at: {
                    type: String,
                },
                position:  {
                    type: String,
                },
                duration:  {
                    type: String,
                },
            },
          ],
    },
    bio: {
        type: String,
    },
    
    //contact section

    contact: {
        email: {
            type: String,
        },
        tel: [
            {
                type: String,
            }
        ],
        facebook: {
            type: String,
        },
        telegram: {
            type: String,
        },
        linkedin: {
            type: String,
        },
        instagram: {
            type: String,
        },
        twitter: {
            type: String,
        },
    },

    //action
    favorite: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'news',
        }
    ],

    //class
    class: {
        type: String,
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