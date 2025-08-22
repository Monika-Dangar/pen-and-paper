const writerService = require('../services/writerService');

// Utility function to handle responses
const sendResponse = (res, status, success, message, data = null) => {
    return res.status(status).send({ success, message, data });
};

async function handleUpload(req, res) {
    try {
        const { writingId, title, content, selectedTags } = req.body;

        const categoryId = await writerService.findCategoryType(selectedTags);

        if (!categoryId.success) {
            return sendResponse(res, 404, false, categoryId.message);
        }

        if (writingId) {
            // console.log(`writingId: ${writingId}`);

            const updatedFields = {};

            if (title) updatedFields.title = title;
            if (content) updatedFields.content = content;
            if (category) updatedFields.writingCategoryId = categoryId.data._id;

            const updatedWriting = await writerService.updateExistingContent(writingId, updatedFields);

            if (!updatedWriting.success) {
                return sendResponse(res, 404, false, updatedWriting.message);
            }

            return sendResponse(res, 200, true, updatedWriting.message, updatedWriting);
        }

        const { username } = req.user;
        const writer = await writerService.findUser(username);

        if (!writer.success) {
            return sendResponse(res, 404, false, writer.message);
        }

        const { selectedType } = req.body;
        const contentId = await writerService.findContentType(selectedType);

        if (!contentId.success) {
            return sendResponse(res, 404, false, 'Content ID not found');
        }

        let categoryIds = categoryId.data.map((cat) => cat._id)

        const newWriting = {
            writerId: writer.data._id,
            title,
            content,
            contentTypeId: contentId.data._id,
            writingCategoryId: categoryIds,
        };

        const createdWriting = await writerService.createWriting(newWriting);

        if (!createdWriting.success) {
            return sendResponse(res, 401, false, createdWriting.message);
        }

        return sendResponse(res, 201, true, createdWriting.message, createdWriting.writing);

    } catch (error) {
        console.log(`Error in uploading writing: ${error}`);
        return sendResponse(res, 500, false, error.message || "Internal Server Error");
    }
}

async function handleGetAll(req, res) {
    try {
        const { contentType } = req.params;
        const { username } = req.user;
        const writer = await writerService.findUser(username);

        if (!writer.success) {
            return sendResponse(res, 404, false, writer.message);
        }

        const content = await writerService.findContentType(contentType);

        if (!content.success) {
            return sendResponse(res, 404, false, 'Content type not found');
        }

        const writings = await writerService.findContentByWriterIdAndContentType(writer.data._id, content.data._id);

        if (!writings.success) {
            return sendResponse(res, 404, false, 'No writings found for this category');
        }

        return sendResponse(res, 200, true, writings.message, writings.data);

    } catch (error) {
        console.log(`Error in retrieving category for writerId: ${error}`);
        return sendResponse(res, 500, false, error.message || 'Internal Server Error');
    }
}

async function handleGetContentById(req, res) {
    try {
        const { contentId } = req.params;
        // console.log(`contentId: ${contentId}`);

        const content = await writerService.findContentById(contentId); // Add appropriate service for fetching content
        // console.log(`msg: ${content.message}`);

        if (content) {
            return sendResponse(res, 200, true, 'Successfully found content', content.data);
        }

        return sendResponse(res, 404, false, 'No content found for contentId');

    } catch (error) {
        console.log(`Error in retrieving content by Id: ${error}`);
        return sendResponse(res, 500, false, error.message || 'Internal Server Error');
    }
}

// async function handleIncrementLikeOfContentById(req, res) {
//     try {
//         const { contentId } = req.params;
//         const content = await writerService.findContentByIdAndAddLike(contentId);

//         if (!content.success) {
//             return sendResponse(res, 404, false, "Content not found");
//         }

//         return sendResponse(res, 200, true, `Like added!`, content.data);

//     } catch (error) {
//         console.log("Error in incrementing like of content by Id", error);
//         return sendResponse(res, 500, false, "An error occurred while incrementing the like.");
//     }
// }

// async function handleAddCommentByContentId(req, res) {
//     try {
//         const { contentId } = req.params;
//         const { comment } = req.body;
//         const content = await writerService.findContentByIdAndAddComment(contentId, comment);

//         if (!content.success) {
//             return sendResponse(res, 404, false, "Content not found!");
//         }

//         return sendResponse(res, 200, true, "Comment added successfully!", content.data);

//     } catch (error) {
//         console.error(`Error in adding comment to contentId: ${error}`);
//         return sendResponse(res, 500, false, "Server error while adding comment.");
//     }
// }

async function handleToggleLikeOfContentById(req, res) {
    try {
        const { username } = req.user;
        const user = await writerService.findUser(username);

        const { contentId } = req.params;
        const result = await writerService.findContentByIdAndToggleLike(contentId, user.data._id);

        if (!result.success) {
            return sendResponse(res, 404, false, result.message || "Content not found or already liked");
        }

        return sendResponse(res, 200, true, "Like added!", result.data);
    } catch (error) {
        console.error("Error in incrementing like of content by Id", error);
        return sendResponse(res, 500, false, "An error occurred while incrementing the like.");
    }
}

async function handleAddCommentByContentId(req, res) {
    try {
        const { username } = req.user;
        const user = await writerService.findUser(username);

        const { contentId } = req.params;
        const { comment } = req.body;

        const result = await writerService.findContentByIdAndAddComment(contentId, user.data._id, comment);

        if (!result.success) {
            return sendResponse(res, 404, false, result.message || "Content not found!");
        }

        return sendResponse(res, 200, true, "Comment added successfully!", result.data);
    } catch (error) {
        console.error(`Error in adding comment to contentId: ${error}`);
        return sendResponse(res, 500, false, "Server error while adding comment.");
    }
}

async function handleDeleteContentById(req, res) {
    try {
        const { contentId } = req.params;
        const response = await writerService.findContentByIdAndDelete(contentId);

        if (response.success) {
            return sendResponse(res, 200, true, `Content deleted successfully!`, response.data);
        }

        return sendResponse(res, 404, false, `Content not found for deletion.`);

    } catch (error) {
        console.log(`Error in deleting content by Id`, error);
        return sendResponse(res, 500, false, `Error in deleting content by Id`, error);
    }
}

module.exports = {
    handleUpload,
    handleGetAll,
    handleGetContentById,
    handleToggleLikeOfContentById,
    handleAddCommentByContentId,
    handleDeleteContentById
};
