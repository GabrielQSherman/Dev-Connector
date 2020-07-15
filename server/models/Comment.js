//required packages
const mongoose = require("mongoose");

module.exports = 
mongoose.model(
    'comment', 
    new mongoose.Schema({

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },

        content: {
            type: String,
            minlength: 1,
            maxlength: 100
        },

        likes: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'users',
            default: []
        },

    })
)