const Writer = require('../models/writer');
const Category = require('../models/category');
const ContentType = require('../models/contentType');
const Writing = require('../models/writing')

function create(data) {
    const newWriter = new Writer(data);
    return newWriter.save();
}

function createWriting(data) {
    const newWriting = new Writing(data);
    return newWriting.save();
}

function findWritingByIdAndUpdate(writingId, data) {
    return Writing.findOneAndUpdate(
        { _id: writingId }, // The query to find the writing by its ID
        data,                // The data to update
        { new: true }        // Option to return the updated document
    );

}

function findByUsername(username) {
    return Writer.findOne({ username: username });
}

function findCategory(category) {
    return Category.findOne({ categoryType: category })
}

function findContentType(contentType) {
    return ContentType.findOne({ contentType: contentType })
}

function findContentById(contentId) {
    return Writing.findById(contentId).populate("writingCategoryId")
}

function findWritingByIdAndDelete(writingId) {
    return Writing.findByIdAndDelete(writingId)
}

function findWritingByWriterIdAndContentType(writerId, contentType) {
    return Writing.find({
        writerId: writerId,
        contentTypeId: contentType
    }).populate('contentTypeId').populate('writingCategoryId')
}

function findContentByIdAndIncrementLike(writingId) {
    return Writing.findOneAndUpdate(
        { _id: writingId },  // Searching for the writing by its ID
        { $inc: { likes: 1 } },  // Incrementing the likes field by 1
        { new: true }  // This ensures the updated document is returned
    );
}

function findContentByIdAndComment(writingId, comment) {
    return Writing.findOneAndUpdate(
        { _id: writingId },
        { $push: { comments: { comment: comment } } },  // Push the new comment into the comments array
        { new: true }  // Return the updated content document after update
    )
}

module.exports = {
    create,
    createWriting,
    findByUsername,
    findCategory,
    findContentType,
    findContentById,
    findWritingByIdAndUpdate,
    findWritingByIdAndDelete,
    findWritingByWriterIdAndContentType,
    findContentByIdAndIncrementLike,
    findContentByIdAndComment
}