const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    writingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WritingSchema',
        required: true,
    },
    likes: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const LikeSchema = mongoose.model('LikeSchema', likeSchema)
module.exports = LikeSchema;