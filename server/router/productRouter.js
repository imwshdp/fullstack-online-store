const Router = require('express')
const asyncHandler = require('express-async-handler')
const productController = require('../controllers/productController')
const checkRole = require('../middleware/checkRoleMiddleware')

const router = new Router()

router.post('/', checkRole('ADMIN'), asyncHandler(productController.create))
router.delete('/', checkRole('ADMIN'), asyncHandler(productController.delete))
router.get('/', asyncHandler(productController.getAll))
router.get('/:id', asyncHandler(productController.getOne))

router.put('/basics', checkRole('ADMIN'), asyncHandler(productController.changeBasics))
router.put('/extra', checkRole('ADMIN'), asyncHandler(productController.changeInfoImage))

module.exports = router;