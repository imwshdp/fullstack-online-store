const Router = require('express')
const asyncHandler = require('express-async-handler')
const userController = require('../controllers/userController')
const checkAuth = require('../middleware/authMiddleware')

const router = new Router()

router.post('/registration', asyncHandler(userController.registration))
router.post('/login', asyncHandler(userController.login))
router.get('/auth', checkAuth, asyncHandler(userController.check))
// add delete

module.exports = router;