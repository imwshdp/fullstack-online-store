const Router = require('express')

const userRouter = require('./userRouter')

const categoryRouter = require('./categoryRouter')

const productRouter = require('./productRouter')
const productInfoRouter = require('./productInfoRouter')
const productImageRouter = require('./productImageRouter')
const productReviewRouter = require('./productReviewRouter')

const basketRouter = require('./basketRouter')
const basketProductRouter = require('./basketProductRouter')

const orderRouter = require('./orderRouter')

// ROUTER
const router = new Router()

// USER
router.use('/user', userRouter)

// CATEGORY
router.use('/category', categoryRouter) // for admin

// PRODUCT
router.use('/product', productRouter)
router.use('/reviews', productReviewRouter)
router.use('/images', productImageRouter) // for admin
router.use('/info', productInfoRouter) // for admin

// BASKET
router.use('/baskets', basketRouter)
router.use('/basket', basketProductRouter)

// ORDER
router.use('/orders', orderRouter)

module.exports = router;