const Router = require('express')
const asyncHandler = require('express-async-handler')
const productController = require('../controllers/productController')
const checkRole = require('../middleware/checkRoleMiddleware')

const router = new Router()

router.post('/', checkRole('ADMIN'), asyncHandler(productController.create))
router.delete('/', checkRole('ADMIN'), asyncHandler(productController.delete))
router.get('/', asyncHandler(productController.getAll))
router.get('/:id', asyncHandler(productController.getOne))

module.exports = router;