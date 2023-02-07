const Router = require('express')
const asyncHandler = require('express-async-handler')
const basketController = require('../controllers/basketController')
const checkAuth = require('../middleware/authMiddleware')

const router = new Router()

router.get('/', checkAuth, asyncHandler(basketController.getOne))

module.exports = router;