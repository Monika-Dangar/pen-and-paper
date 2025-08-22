const Writer = require('../models/writer');
const Category = require('../models/category');
const ContentType = require('../models/contentType');
const Writing = require('../models/writing')
const Like = require('../models/like');
const Comment = require('../models/comment');

async function toggleLikeOnContent(writingId, userId) {
    try {
        // Check if like already exists
        const existingLike = await Like.findOne({ writingId, userId });

        if (existingLike) {
            // User already liked -> remove like
            await Like.deleteOne({ _id: existingLike._id });
            // Decrement likeCount in Writing
            const updatedWriting = await Writing.findByIdAndUpdate(
                writingId,
                { $inc: { likeCount: -1 } },
                { new: true }
            );
            return { success: true, message: "Like removed", data: updatedWriting };
        } else {

            // Create new Like doc
            await Like.create({ writingId, userId });

            // Increment likeCount in Writing
            const updatedWriting = await Writing.findByIdAndUpdate(
                writingId,
                { $inc: { likeCount: 1 } },
                { new: true }
            );

            if (!updatedWriting) {
                // Rollback like if writing not found
                await Like.deleteOne({ writingId, userId });
                return { success: false, message: "Content not found" };
            }
            return { success: true, message: "Like added", data: updatedWriting };
        }
    } catch (error) {
        console.error("Error in addLikeToContent repo:", error);
        return { success: false, message: "Failed to add like", data: null };
    }
}

async function addCommentToContent(writingId, userId, commentText) {
    try {
        // Create new comment doc
        const comment = await Comment.create({ writingId, userId, comment: commentText });

        // Increment commentCount in Writing
        const updatedWriting = await Writing.findByIdAndUpdate(
            writingId,
            { $inc: { commentCount: 1 } },
            { new: true }
        );

        if (!updatedWriting) {
            // Rollback comment if writing not found
            await Comment.findByIdAndDelete(comment._id);
            return { success: false, message: "Content not found" };
        }

        return { success: true, message: "Comment added", data: updatedWriting };
    } catch (error) {
        console.error("Error in addCommentToContent repo:", error);
        return { success: false, message: "Failed to add comment", data: null };
    }
}

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
    return Category.find({ categoryType: category })
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

function findContentByIdAndIncrementLike(writingId, likedBy) {

    return Writing.findOneAndUpdate(
        { _id: writingId },  // Searching for t+he writing by its ID
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
    findContentByIdAndComment,
    addCommentToContent,
    toggleLikeOnContent
}