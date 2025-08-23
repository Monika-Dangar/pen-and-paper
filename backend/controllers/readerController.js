const Writings = require('../models/writing')
const Content = require('../models/contentType')
const Tags = require('../models/category')
const { getUserAuth } = require('../services/tokenGenration');
const writerService = require('../services/writerService')
const CommentSchema = require('../models/comment')
const LikeSchema = require('../models/like')

async function handleGetContentsByContentType(req, res) {
    try {

        // Add search filter if search term provided
        // console.log('req: ', req.query);

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

        let user = null;
        let likesInfo = null
        let commentsInfo = null
        if (req.query?.authToken) {
            const decodedToken = getUserAuth(req.query.authToken);
            // Attach decoded token info to the request for use in further middleware or route handlers
            req.user = decodedToken;
            user = await writerService.findUser(req.user.username);
            commentsInfo = await CommentSchema.find({ userId: user.data._id })
            likesInfo = await LikeSchema.find({ userId: user.data._id })
        }

        const query = {
            ...(contentId && { contentTypeId: contentId }),
            ...(tagId && { writingCategoryId: tagId }),
            ...(searchOrConditions.length > 0 && { $or: searchOrConditions }),
        };

        const contents = await Writings.find(query)
            .populate('writerId', 'username')
            .populate('writingCategoryId', 'categoryType')

        return res.status(200).send({
            message: "Successfully fetched content for contentType",
            data: contents,
            likesInfo,
            commentsInfo
        });

    } catch (error) {
        console.error("Error in fetching content:", error);
        return res.status(500).send({ message: "An error occurred while fetching content" });
    }
}

module.exports = { handleGetContentsByContentType };
