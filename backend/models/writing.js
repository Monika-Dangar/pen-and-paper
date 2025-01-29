const mongoose = require('mongoose');

const writingSchema = new mongoose.Schema({
    writerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WriterSchema'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    contentTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContentTypeSchema',
        required: true,
    },
    writingCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategorySchema',
        required: true,
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [{
        comment: String,
        createdAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

const WritingSchema = mongoose.model("writingSchema", writingSchema)
module.exports = WritingSchema;