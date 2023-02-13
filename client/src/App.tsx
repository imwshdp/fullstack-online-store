import React, { useEffect } from 'react';
import useAppDispatch from './hooks/useAppDispatch';
import useAppSelector from './hooks/useAppSelector';
import { createCategory, deleteCategory, fetchCategories } from './store/slices/categories/actions';
import { fetchProduct, fetchProducts } from './store/slices/products/actions';
import { login, registration } from './store/slices/user/actions';

const App: React.FC = () => {

  const dispatch = useAppDispatch();

  const userState = useAppSelector(state => state.user);
  const categoriesState = useAppSelector(state => state.categories);
  const productsState = useAppSelector(state => state.products);

  // console.log("categories state: ", categoriesState);
  // console.log("user state: ", userState);
  console.log("products state: ", productsState);

  useEffect(() => {
    dispatch(login({email: 'admin@mail.ru', password: 'qwerty'}))
    dispatch(fetchProduct({id: 1}))
    // dispatch(fetchProducts({categoryId: 1}))
    // dispatch(fetchCategories())
  }, []);

  return (
    <div>
      {userState.loading
      ? "загрузка..."
      : ""
      }
      {userState.user
      ? "пользователь есть"
      : "пользователя нету"
      }
    </div>
  );
}

export default App;