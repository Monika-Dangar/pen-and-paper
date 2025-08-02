const mongoose = require('mongoose')

const writerScehma = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    profileImagePath: {
        type: String
    },
    posts: {
        type: Number,
        default: 0,
        required: true,
    },
    followersId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'WriterSchema'
        }
    ],
    followingId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'WriterSchema'
        }
    ],

}, { timestamps: true })

const WriterSchema = mongoose.model("WriterSchema", writerScehma)

module.exports = WriterSchema