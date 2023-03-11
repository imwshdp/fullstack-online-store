import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';

import { RouteNames } from 'router';
import { login, registration } from 'store/slices/user/actions';

import Header from 'components/General/Header';
import Footer from 'components/General/Footer';
import AppRouter from 'components/General/AppRouter';
import MobileMenu from 'components/Mobile/MobileMenu';
import MobileNavbar from 'components/Mobile/MobileNavbar';

import './resources/styles/index.css';
import { fetchBasket, fetchBasketProduct } from 'store/slices/basket/actions';

interface ExtraLinks {
  value: string;
  link: string;
}

const App: React.FC = () => {

  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.user.user)
  // const basketId = useAppSelector(state => state.basket.basketId)

  // TESTS
  useEffect(() => {
    dispatch(login({email: 'admin@mail.ru', password: 'qwerty'}))
  }, []);

  // fetch user's basket when user logged
  useEffect(() => {
    if(!user?.id) return;
    dispatch(fetchBasket({ userId: user.id }))
  }, [user])

  // // fetch products in basket when basket fetched
  // useEffect(() => {
  //   if(!basketId) return;
  //   dispatch(fetchBasketProduct({ basketId: basketId}))
  // }, [basketId])

  // mobile menu state
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