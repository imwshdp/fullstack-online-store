const Router = require('express')
const asyncHandler = require('express-async-handler')
const categoryController = require('../controllers/categoryController')
const checkRole = require('../middleware/checkRoleMiddleware')

const router = new Router()

router.post('/', checkRole('ADMIN'), asyncHandler(categoryController.create))
router.delete('/', checkRole('ADMIN'), asyncHandler(categoryController.delete))
router.get('/', asyncHandler(categoryController.getAll))

module.exports = router;