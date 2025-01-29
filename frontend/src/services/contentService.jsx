import api from './api'

export const handleUploadContent = async (contentType, postData) => {
    try {
        // console.log(`contentType: ${contentType}, title: ${postData.title}, content: ${postData.content}`);

        const response = await api.post(`/writer/contentType/${contentType}`, postData)
        if (response) {
            // console.log(response);
            return response;
        }
    } catch (error) {
        console.log(`Error in uploading content ${error}`);
    }
}

export const handleGetContentByCategory = async (contentType) => {
    try {
        // console.log(`contentType: ${contentType}`);
        const response = await api.get(`/reader/${contentType}`)
        if (response) {
            // console.log(response);
            return response;
        }
    } catch (error) {
        console.log(`Error in gettin content by Id ${error}`);
    }
}

export const handleIncrementLikeOfContent = async (writingId) => {
    try {
        // console.log(`writingId: ${writingId}`);
        const response = await api.post(`/reader/${writingId}`)
        if (response) {
            // console.log(response);
            return response;
        }
    } catch (error) {
        console.log(`Error in incrementing like for ${error}`);
    }
}

export const handleCommentOfContent = async (comment, writingId) => {
    try {
        // console.log(`comment: ${comment}, wirintgId: ${writingId}`);
        const data = {
            comment
        }

        const response = await api.post(`/writer/contentId/${writingId}`, data)
        if (response) {
            // console.log(response);
            return response;
        }
    } catch (error) {
        console.log(`Error in incrementing like for ${error}`);
    }
}

export const handleGetContentType = async (contentType) => {

    try {
        const response = await api.get(`/writer/contentType/${contentType}`)
        // console.log(response);

        if (response) {
            // console.log(`Got writer all files`, response);
            return response;  // Return only the data part
        }

    } catch (error) {
        if (error.status != 404) {
            console.error(`Error during fetching content type: ${error.message}`);
        }
    }
}

export const handleGetContentById = async (contentId) => {
    try {
        // console.log(`contentId: ${contentId}`);
        const response = await api.get(`/writer/contentId/${contentId}`)
        if (response) {
            // console.log(response);
            return response;
        }
    } catch (error) {
        console.log(`Error in gettin content by Id ${error}`);
    }
}

export const handleDeleteContentById = async (contentId) => {
    try {

        const response = await api.delete(`/writer/contentId/${contentId}`)
        if (response) {
            return response;  // Return only the data part
        } else {
            console.error('No data found for the given content type.');
        }
    } catch (error) {
        console.error(`Error during deleting content by Id: ${error.message}`);
    }
}
