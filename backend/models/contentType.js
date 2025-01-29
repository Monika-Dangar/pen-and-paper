const mongoose = require('mongoose')

const contentTypeSchema = new mongoose.Schema({
    contentType: {
        type: String,
        enum: ['poem', 'essay', 'thought', 'quote', 'shortStory'],
        required: true,

    }
}, { timestamps: true });

const ContentTypeSchema = mongoose.model("ContentTypeSchema", contentTypeSchema);
module.exports = ContentTypeSchema;