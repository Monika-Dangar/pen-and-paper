const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    writingId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const CommentSchema = mongoose.model("CommentSchema", commentSchema);
module.exports = CommentSchema;