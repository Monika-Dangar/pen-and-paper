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

}, { timestamps: true })

const WriterSchema = mongoose.model("WriterSchema", writerScehma)

module.exports = WriterSchema