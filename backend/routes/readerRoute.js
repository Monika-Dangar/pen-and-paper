const express = require('express');
const router = express.Router();
const { handleIncrementLikeOfContentById } = require('../controllers/writingController')
const { handleGetContentsByContentType } = require('../controllers/readerController')

router.route('/:contentType').get(handleGetContentsByContentType)

router.route('/:contentId').post(handleIncrementLikeOfContentById)

module.exports = router;