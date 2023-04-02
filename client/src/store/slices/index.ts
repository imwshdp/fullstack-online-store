import userReducer from './user'
import basketReducer from './basket'
import ordersReducer from './orders'
import productsReducer from './products'
import categoriesReducer from './categories'

export default {
  user: userReducer,
  categories: categoriesReducer,
  products: productsReducer,
  basket: basketReducer,
  orders: ordersReducer,
}