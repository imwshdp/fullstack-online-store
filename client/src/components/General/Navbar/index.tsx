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
          <div onClick={() => navigate(RouteNames.BASKET_ROUTE)}>Корзина</div>
          <div onClick={() => navigate(RouteNames.ORDER_ROUTE)}>Заказы</div>
          <div onClick={() => navigate(RouteNames.ADMIN_ROUTE)}>Админ панель</div>
          <div onClick={() => navigate(RouteNames.ACCOUNT_ROUTE)}>Учетная запись</div>
        </>
      :
        <>
          <div onClick={() => navigate(RouteNames.SHOP_ROUTE)}>Магазин</div>
          <div onClick={() => navigate(RouteNames.LOGIN_ROUTE)}>Войти</div>
        </>
      }
    </nav>
  );
}

export default Navbar;