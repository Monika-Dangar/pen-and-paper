const express = require('express');
const router = express.Router();
const { handleToggleLikeOfContentById } = require('../controllers/writingController')
const { handleGetContentsByContentType } = require('../controllers/readerController')
const { authenticate } = require('../middlewares/auth')

router.route('/').get(handleGetContentsByContentType)

router.route('/:contentId').post(authenticate, handleToggleLikeOfContentById)

module.exports = router;