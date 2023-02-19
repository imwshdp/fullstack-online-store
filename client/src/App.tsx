import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';

import { login, registration } from 'store/slices/user/actions';
import { fetchProduct, fetchProducts } from 'store/slices/products/actions';
import { createCategory, deleteCategory, fetchCategories } from 'store/slices/categories/actions';

import AppRouter from 'components/AppRouter';
import Header from 'components/Header';
import Footer from 'components/Footer';

import './resources/styles/index.css';

const App: React.FC = () => {

  const dispatch = useAppDispatch();

  const userState = useAppSelector(state => state.user);
  const categoriesState = useAppSelector(state => state.categories);
  const productsState = useAppSelector(state => state.products);

  console.log("user state: ", userState);
  // console.log("categories state: ", categoriesState);
  // console.log("products state: ", productsState);

  useEffect(() => {
    dispatch(login({email: 'admin@mail.ru', password: 'qwerty'}))
    
    // TESTS
    // dispatch(fetchProduct({id: 1}))
    // dispatch(fetchProducts({categoryId: 1}))
    // dispatch(fetchCategories())
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
}

export default App;