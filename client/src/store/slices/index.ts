import userReducer from './user'
import categoriesReducer from './categories'
import productsReducer from './products'
import basketReducer from './basket'

export default {
  user: userReducer,
  categories: categoriesReducer,
  products: productsReducer,
  basket: basketReducer,
}