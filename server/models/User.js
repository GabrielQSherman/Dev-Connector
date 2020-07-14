//required packages
const mongoose = require("mongoose");

module.exports = 
mongoose.model(
    'user', 
    new mongoose.Schema({

        username: {
            required: true,
            type: String,
            unique: true,
            minlength: 4,
            maxlength: 20
        },

        email: {
            required: true,
            type: String,
            unique: true
        },

        password: {
            required: true,
            type: String,
            minlength: 7,
            maxlength: 1000
        },

        posts: {
            type: [mongoose.Types.ObjectId],
            ref: 'posts',
            default: []
        },

        adminProp: {
            adminLevel: {
                type: Number,
                default: 0
            },
            isAdmin: {
                type: Boolean,
                default: false
            }
        }

    })
)