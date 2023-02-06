const Router = require('express')
const asyncHandler = require('express-async-handler')
const productReviewController = require('../controllers/productReviewController')
const checkAuth = require('../middleware/authMiddleware')

const router = new Router()

router.post('/', checkAuth, asyncHandler(productReviewController.create))
router.delete('/', checkAuth, asyncHandler(productReviewController.delete))
router.get('/', asyncHandler(productReviewController.getAll))

module.exports = router;