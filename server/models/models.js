const { DataTypes } = require('sequelize')
const sequelize = require('../db')

// TABLES

const User = sequelize.define('users', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'USER' },
})

const Basket = sequelize.define('baskets', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const BasketProduct = sequelize.define('baskets_products', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
})

const Product = sequelize.define('products', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  imgMobile: { type: DataTypes.STRING, allowNull: false },
  imgDesktop: { type: DataTypes.STRING, allowNull: false },
})

const ProductInfo = sequelize.define('products_info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
})

const ProductImage = sequelize.define('products_images', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  image: { type: DataTypes.STRING, allowNull: false },
  primary: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
})

const ProductReview = sequelize.define('products_reviews', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  score: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  review: { type: DataTypes.STRING, allowNull: false },
})

const Category = sequelize.define('categories', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Order = sequelize.define('orders', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const OrderProduct = sequelize.define('orders_products', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
})

// RELATIONSHIPS

// USER
User.hasOne(Basket)
Basket.belongsTo(User)

User.hasOne(Order)
Order.belongsTo(User)

User.hasMany(ProductReview)
ProductReview.belongsTo(User)

// BASKET
Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

// ORDER
Order.hasMany(OrderProduct)
OrderProduct.belongsTo(Order)

// CATEGORY
Category.hasMany(Product)
Product.belongsTo(Category)

// PRODUCT
Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

Product.hasMany(OrderProduct)
OrderProduct.belongsTo(Product)

Product.hasMany(ProductInfo, { as: 'info' })
ProductInfo.belongsTo(Product)

Product.hasMany(ProductImage, { as: 'image' })
ProductImage.belongsTo(Product)

Product.hasMany(ProductReview, { as: 'review' })
ProductReview.belongsTo(Product)

// EXPORT
module.exports = {
  User,
  Basket,
  BasketProduct,
  Product,
  ProductInfo,
  ProductImage,
  ProductReview,
  Category,
  Order,
  OrderProduct,
}