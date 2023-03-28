import React from 'react';
import { useNavigate } from 'react-router';

import useAppSelector from 'hooks/useAppSelector';
import { RouteNames } from 'router';

import css from "./index.module.css";

const Navbar: React.FC = () => {

  const navigate = useNavigate();
  const { isUserAuth } = useAppSelector(state => state.user)

  return (
    <nav className={css.Navbar}>
      {isUserAuth
      ?
        <>
          <span onClick={() => navigate(RouteNames.SHOP_ROUTE)}>Каталог</span>
          <span onClick={() => navigate(RouteNames.BASKET_ROUTE)}>Корзина</span>
          <span onClick={() => navigate(RouteNames.ORDER_ROUTE)}>Заказы</span>
          <span onClick={() => navigate(RouteNames.ACCOUNT_ROUTE)}>Учетная запись</span>
        </>
      :
        <>
          <span onClick={() => navigate(RouteNames.SHOP_ROUTE)}>Каталог</span>
          <span onClick={() => navigate(RouteNames.LOGIN_ROUTE)}>Войти</span>
        </>
      }
    </nav>
  );
}

export default Navbar;