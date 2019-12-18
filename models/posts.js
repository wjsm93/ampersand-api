const mongoose = require('mongoose')

const postsSchema = new mongoose.Schema({
    photo: {
        type: String
    },
    user_id: {
        type: String,
        required: true
    },
    caption: {
        type: String
    },
    created_at : {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', postsSchema)