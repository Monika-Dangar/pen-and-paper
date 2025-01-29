const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    categoryType: {
        type: String,
        enum: [
            'Love', 'Faith', 'Loss', 'Youth', 'Dreams', 'Nature', 'Sad', 'Spiritual', 'Family',
            'Friendship', 'Philosophy', 'Fiction', 'Life', 'Inspirational', 'Freedom', 'Hope', 'Grief',
            'Mystery', 'Happiness', 'Fantasy'
        ],
        required: true,

    }
}, { timestamps: true });

const CategorySchema = mongoose.model("CategorySchema", categorySchema);
module.exports = CategorySchema;