const Router = require('express')
const asyncHandler = require('express-async-handler')
const productImageController = require('../controllers/productImageController')
const checkRole = require('../middleware/checkRoleMiddleware')

const router = new Router()

router.post('/', checkRole('ADMIN'), asyncHandler(productImageController.create))
router.delete('/', checkRole('ADMIN'), asyncHandler(productImageController.delete))
router.get('/', asyncHandler(productImageController.getAll))

module.exports = router;