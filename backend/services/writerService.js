const writerRepo = require('../repository/writerRepo');

// Utility function to handle service responses
function handleServiceResponse(success, message, data) {
    if (success) {
        return { success: true, message, data };
    } else {
        return { success: false, message, data: null };
    }
}

// Create writer
async function createWriter(data) {
    try {
        const writer = await writerRepo.create(data);
        return handleServiceResponse(writer, writer ? 'Writer signed up successfully' : 'Writer sign up unsuccessful', writer);
    } catch (error) {
        console.log(`Error in sign up: ${error}`);
        return handleServiceResponse(false, 'Error during sign up', null);
    }
}

// Create writing
async function createWriting(data) {
    try {
        const writing = await writerRepo.createWriting(data);

        if (writing) {
            const response = await writerRepo.incrementPostsOfWriter(writing);
        }

        return handleServiceResponse(writing, writing ? 'Writing uploaded successfully' : 'Writing not uploaded!', writing);
    } catch (error) {
        console.log(`Error in creating writing: ${error}`);
        return handleServiceResponse(false, 'Error during writing upload', null);
    }
}

// Find user by username
async function findUser(username) {
    try {
        const writer = await writerRepo.findByUsername(username);

        return handleServiceResponse(writer, writer ? 'Writer found!' : 'Writer not found!', writer);
    } catch (error) {
        console.log(`Error in finding user: ${error}`);
        return handleServiceResponse(false, 'Error during finding user', null);
    }
}

async function findOtherWriterByUsername(writerUsername) {
    const writersFound = await writerRepo.findByUsernameForSearch(writerUsername);

    console.log(`writerFound: ${writersFound}`);

    if (writersFound.length == 0) {
        return
    }

    let writerData = {};

    for (let data of writersFound) {
        writerData[data.username] = {
            writer: data,
            writing: []
        }
    }

    for (let username in writerData) {
        const writer = writerData[username].writer;
        const writingFound = await writerRepo.findWritingByWriterId(writer._id);

        // If writings are found, push them to the respective writer's data
        if (writingFound) {
            writerData[username].writing.push(writingFound);
        }
    }

    return Object.values(writerData);
}

// Find category type
async function findCategoryType(category) {
    try {
        const categoryType = await writerRepo.findCategory(category);
        return handleServiceResponse(categoryType, categoryType ? 'Category type found!' : "Didn't find category", categoryType);
    } catch (error) {
        console.log(`Error in finding category type: ${error}`);
        return handleServiceResponse(false, 'Error during category lookup', null);
    }
}

// Find content type
async function findContentType(contentType) {
    try {
        const content = await writerRepo.findContentType(contentType);
        return handleServiceResponse(content, content ? 'Content type found!' : "Didn't find content type", content);
    } catch (error) {
        console.log(`Error in finding content type: ${error}`);
        return handleServiceResponse(false, 'Error during content type lookup', null);
    }
}

async function findContentById(contentId) {
    try {
        const content = await writerRepo.findContentById(contentId)
        return handleServiceResponse(content, content ? 'Content found!' : "Didn't find content", content);
    } catch (error) {
        console.log(`Error in finding content: ${error}`);
        return handleServiceResponse(false, 'Error during content lookup', null);
    }
}


// Update existing content
async function updateExistingContent(writingId, data) {
    try {
        const writing = await writerRepo.findWritingByIdAndUpdate(writingId, data);
        return handleServiceResponse(writing, writing ? 'Writing updated successfully' : "Couldn't find writing by ID", writing);
    } catch (error) {
        console.log(`Error in updating writing: ${error}`);
        return handleServiceResponse(false, 'Error during writing update', null);
    }
}

// Delete content by ID
async function findContentByIdAndDelete(contentId) {
    try {
        const resp = await writerRepo.findWritingByIdAndDelete(contentId);
        return handleServiceResponse(resp, resp ? 'Content deleted' : 'Failed to delete content', resp);
    } catch (error) {
        console.log(`Error in deleting content: ${error}`);
        return handleServiceResponse(false, 'Error during content deletion', null);
    }
}

// Find content by writer ID and content type
async function findContentByWriterIdAndContentType(writerId, contentType) {
    try {
        const writings = await writerRepo.findWritingByWriterIdAndContentType(writerId, contentType);
        return handleServiceResponse(writings, writings ? 'Content found for writer by content type' : 'No content found', writings);
    } catch (error) {
        console.log(`Error in fetching content by writer and type: ${error}`);
        return handleServiceResponse(false, 'Error during fetching content by writer and type', null);
    }
}

// Add like to content by ID
async function findContentByIdAndAddLike(contentId) {
    try {
        const response = await writerRepo.findContentByIdAndIncrementLike(contentId);
        return handleServiceResponse(response, response ? 'Like added' : 'Failed to add like', response);
    } catch (error) {
        console.log(`Error in adding like: ${error}`);
        return handleServiceResponse(false, 'Error during adding like', null);
    }
}

// Add comment to content by writing ID
async function findContentByIdAndAddComment(writingId, comment) {
    try {
        const response = await writerRepo.findContentByIdAndComment(writingId, comment);
        return handleServiceResponse(response, response ? 'Comment added' : 'Failed to add comment', response);
    } catch (error) {
        console.log(`Error in adding comment: ${error}`);
        return handleServiceResponse(false, 'Error during adding comment', null);
    }
}

module.exports = {
    createWriter,
    createWriting,
    findUser,
    findOtherWriterByUsername,
    findCategoryType,
    findContentType,
    findContentById,
    updateExistingContent,
    findContentByIdAndDelete,
    findContentByWriterIdAndContentType,
    findContentByIdAndAddLike,
    findContentByIdAndAddComment
}
