const Writings = require('../models/writing')
const Content = require('../models/contentType')
const Tags = require('../models/category')

async function handleGetContentsByContentType(req, res) {
    try {

        // Add search filter if search term provided
        console.log('req: ', req.query);

        const trimmedSearch = req.query.search.trim();

        const searchOrConditions = [];
        if (trimmedSearch) {
            searchOrConditions.push(
                { title: { $regex: trimmedSearch, $options: 'i' } },
            );
        }

        let contentId = null;
        if (req.query?.contentType != 'all') {
            const contentDoc = await Content.findOne({ contentType: req.query?.contentType });
            if (contentDoc) contentId = contentDoc._id;
        }

        let tagId = null;
        if (req.query?.tag) {
            const tagDoc = await Tags.findOne({ categoryType: req.query?.tag });
            if (tagDoc) tagId = tagDoc._id;
        }

        const query = {
            ...(contentId && { contentTypeId: contentId }),
            ...(tagId && { writingCategoryId: tagId }),
            ...(searchOrConditions.length > 0 && { $or: searchOrConditions }),
        };

        const contents = await Writings.find(query)
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
