const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
    followersId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WriterSchema'
    },

    followingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WriterSchema'
    },
}, { timestamps: true });

const ConnectionSchema = mongoose.model("connectionSchema", connectionSchema)
module.exports = ConnectionSchema;