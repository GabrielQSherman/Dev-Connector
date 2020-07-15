//required packages
const mongoose = require("mongoose");
const { text } = require("express");

module.exports = 
mongoose.model(
    'post', 
    new mongoose.Schema({

        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },

        caption: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 177,
        },
        
        image: {
            type: String,
            required: true
        },

        likes: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'users',
            default: []
        }

    })
)