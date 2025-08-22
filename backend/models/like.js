const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    writingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WritingSchema',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WriterSchema',
        required: true,
    }
}, { timestamps: true });

// One user can like a writing only once
likeSchema.index({ writingId: 1, userId: 1 }, { unique: true });

const LikeSchema = mongoose.model('LikeSchema', likeSchema)
module.exports = LikeSchema;