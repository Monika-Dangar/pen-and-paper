const express = require('express')
const router = express.Router();
const { handleGetWriter, handleModifyWriter } = require('../controllers/writerController')
const { handleUpload, handleGetAll, handleGetContentById, handleAddCommentByContentId, handleDeleteContentById } = require('../controllers/writingController')

const { hashPassword } = require("../middlewares/passwordHashing")
const { passwordVerification } = require('../middlewares/passwordVerification')
const { handleWriterSignup } = require('../controllers/signupController')
const { handleWriterLogin } = require('../controllers/loginController')
const { authenticate } = require('../middlewares/auth')

router.route('/signup').post(hashPassword, handleWriterSignup)
router.route("/login").post(passwordVerification, handleWriterLogin)

router.route('/:writerId').get(authenticate, handleGetWriter).patch(authenticate, handleModifyWriter)
router.route('/contentType/:contentType').get(authenticate, handleGetAll).post(authenticate, handleUpload)
router.route('/contentId/:contentId').get(authenticate, handleGetContentById).delete(authenticate, handleDeleteContentById).post(authenticate, handleAddCommentByContentId)


module.exports = router;
