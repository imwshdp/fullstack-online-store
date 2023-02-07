const Router = require('express')
const asyncHandler = require('express-async-handler')
const productInfoController = require('../controllers/productInfoController')
const checkRole = require('../middleware/checkRoleMiddleware')

const router = new Router()

router.post('/', checkRole('ADMIN'), asyncHandler(productInfoController.create))
router.delete('/', checkRole('ADMIN'), asyncHandler(productInfoController.delete))
router.get('/', asyncHandler(productInfoController.getAll))

module.exports = router;