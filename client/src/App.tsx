import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';

import { RouteNames } from 'router';
import { fetchBasket } from 'store/slices/basket/actions';
import { fetchOrders } from 'store/slices/orders/actions';

import Header from 'components/General/Header';
import Footer from 'components/General/Footer';
import AppRouter from 'components/General/AppRouter';
import MobileMenu from 'components/Mobile/MobileMenu';
import MobileNavbar from 'components/Mobile/MobileNavbar';
import './resources/styles/index.css';
import { check } from 'store/slices/user/actions';

interface ExtraLinks {
  value: string;
  link: string;
}

const App: React.FC = () => {

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user)

  useEffect(() => {
    dispatch(check())
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
  ]

  const footerLinks: ExtraLinks[] = [
    {value: "Обо мне", link: ''},
    {value: "Админ Панель", link: RouteNames.ADMIN_ROUTE},
  ]

  return (
    <BrowserRouter>
      <div className='PolygonWrapper' />
      
      <Header />
      <AppRouter />

      <div>
        <div className='FooterPolygonWrapper' />
        <Footer links={footerLinks} />
      </div>

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