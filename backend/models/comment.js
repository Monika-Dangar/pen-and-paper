const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    writingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WritingSchema',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WriterSchema',
        required: true,
    },
    comment: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const CommentSchema = mongoose.model("CommentSchema", commentSchema);
module.exports = CommentSchema;