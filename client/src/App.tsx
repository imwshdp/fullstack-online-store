import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';

import { RouteNames } from 'router';
import { login, registration } from 'store/slices/user/actions';
import { fetchProduct, fetchProducts } from 'store/slices/products/actions';

import Header from 'components/GeneralComponents/Header';
import Footer from 'components/GeneralComponents/Footer';
import AppRouter from 'components/GeneralComponents/AppRouter';
import MobileMenu from 'components/MobileComponents/MobileMenu';
import MobileNavbar from 'components/MobileComponents/MobileNavbar';

import './resources/styles/index.css';

interface ExtraLinks {
  value: string;
  link: string;
}

const App: React.FC = () => {

  const dispatch = useAppDispatch();

  const userState = useAppSelector(state => state.user);
  // console.log("user state: ", userState);

  useEffect(() => {
    dispatch(login({email: 'admin@mail.ru', password: 'qwerty'}))
  }, []);

  // mobile menu
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);

  const [extraLinks, setExtraLinks] = useState<ExtraLinks[]>([
    {value: "Обо мне", link: RouteNames.REDIRECT_ROUTE},
    {value: "Каталог", link: RouteNames.SHOP_ROUTE},
    {value: "Мои заказы", link: RouteNames.ORDER_ROUTE},    
  ])

  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
      <Footer />

      <MobileNavbar
        setIsMenuActive={setIsMenuActive}
        isMenuActive={isMenuActive}
      />
      <MobileMenu
        header={'Меню'}
        items={extraLinks}
        isMenuActive={isMenuActive}
        setIsMenuActive={setIsMenuActive}
      />
    </BrowserRouter>
  );
}

export default App;