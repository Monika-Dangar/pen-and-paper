const Writings = require('../models/writing')
const Content = require('../models/contentType')

async function handleGetContentsByContentType(req, res) {
    try {
        const { contentType } = req.params;

        // Fetch the content type ID
        const contentId = await Content.findOne({ contentType: contentType });
        if (!contentId) {
            return res.status(404).send({ message: "Content type not found" });
        }

        const contents = await Writings.find({ contentTypeId: contentId })
            .populate('writerId', 'username')
            .populate('writingCategoryId', 'categoryType');

        return res.status(200).send({
            message: "Successfully fetched content for contentType",
            contents
        });

    } catch (error) {
        console.error("Error in fetching content:", error);
        return res.status(500).send({ message: "An error occurred while fetching content" });
    }
}

module.exports = { handleGetContentsByContentType };
