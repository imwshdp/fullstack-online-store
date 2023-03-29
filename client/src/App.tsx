import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import jwt_decode from "jwt-decode";

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';

import { RouteNames } from 'router';
import { checkToken } from 'store/slices/user';
import { fetchBasket } from 'store/slices/basket/actions';
import { fetchOrders } from 'store/slices/orders/actions';

import Header from 'components/General/Header';
import Footer from 'components/General/Footer';
import AppRouter from 'components/General/AppRouter';
import MobileMenu from 'components/Mobile/MobileMenu';
import MobileNavbar from 'components/Mobile/MobileNavbar';
import './resources/styles/index.css';

interface ExtraLinks {
  value: string;
  link: string;
}

const App: React.FC = () => {

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user)

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if(token) {
      dispatch(checkToken(jwt_decode(token)))
    }
  }

  useEffect(() => {
    checkAuth()
  }, []);

  // fetch user's basket when user logged
  useEffect(() => {
    if(!user?.id) return;
    dispatch(fetchBasket({ userId: user.id }))
    dispatch(fetchOrders({ userId: user?.id }))
  }, [user])

  // mobile menu state
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);

  const menuLinks: ExtraLinks[] = [
    {value: "Обо мне", link: ''},
    {value: "Каталог", link: RouteNames.SHOP_ROUTE},
    {value: "Корзина", link: RouteNames.BASKET_ROUTE},
    {value: "Заказы", link: RouteNames.ORDER_ROUTE},
    // {value: "Админ Панель", link: RouteNames.ADMIN_ROUTE},
  ]

  const footerLinks: ExtraLinks[] = [
    {value: "Обо мне", link: ''},
    {value: "Админ Панель", link: RouteNames.ADMIN_ROUTE},
  ]

  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
      <Footer links={footerLinks} />

      <MobileNavbar
        setIsMenuActive={setIsMenuActive}
        isMenuActive={isMenuActive}
      />
      <MobileMenu
        header={'Меню'}
        items={menuLinks}
        isMenuActive={isMenuActive}
        setIsMenuActive={setIsMenuActive}
      />
    </BrowserRouter>
  );
}

export default App;