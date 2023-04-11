const Router = require('express')
const asyncHandler = require('express-async-handler')
const basketProductController = require('../controllers/basketProductController')
const checkAuth = require('../middleware/authMiddleware')

const router = new Router()

router.post('/', checkAuth, asyncHandler(basketProductController.create))
router.delete('/', checkAuth, asyncHandler(basketProductController.delete))
router.get('/', checkAuth, asyncHandler(basketProductController.getAll))

router.put('/increase', checkAuth, asyncHandler(basketProductController.increase))
router.put('/decrease', checkAuth, asyncHandler(basketProductController.decrease))

module.exports = router;