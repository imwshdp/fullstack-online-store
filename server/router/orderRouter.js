const Router = require('express')
const asyncHandler = require('express-async-handler')
const orderController = require('../controllers/orderController')
const checkAuth = require('../middleware/authMiddleware')

const router = new Router()

router.get('/', checkAuth, asyncHandler(orderController.getOne))

module.exports = router;