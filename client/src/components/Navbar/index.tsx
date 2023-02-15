import * as React from 'react';
import { useNavigate } from 'react-router';

import useAppSelector from 'hooks/useAppSelector';
import { RouteNames } from 'router';

import css from "./index.module.css";

const Navbar: React.FC = () => {

  const navigate = useNavigate();

  const { isUserAuth } = useAppSelector(state => state.user)

  return (
    <nav className={css.navbar}>
      {isUserAuth
      ?
        <>
          <div className={css.link} onClick={() => navigate(RouteNames.SHOP_ROUTE)}>Магазин</div>
          <div className={css.link} onClick={() => navigate(RouteNames.BASKET_ROUTE)}>Корзина</div>
          <div className={css.link} onClick={() => navigate(RouteNames.ADMIN_ROUTE)}>Админ панель</div>
        </>
      :
      <>
        <div className={css.link} onClick={() => navigate(RouteNames.SHOP_ROUTE)}>Магазин</div>
      </>
      }
    </nav>
  );
}

export default Navbar;