const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    created_at : {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', usersSchema)