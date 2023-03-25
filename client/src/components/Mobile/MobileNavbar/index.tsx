import React from 'react';

import UpIcon from 'resources/icons/UpIcon';
import CartIcon from 'resources/icons/CartIcon';
import MenuIcon from 'resources/icons/MenuIcon';
import UserIcon from 'resources/icons/UserIcon';
import SearchIcon from 'resources/icons/SearchIcon';
import css from "./index.module.css";
import { useNavigate } from 'react-router';
import { RouteNames } from 'router';

interface TProps {
  setIsMenuActive: (state: boolean) => void;
  isMenuActive: boolean;
}

const MobileNavbar: React.FC<TProps> = ({setIsMenuActive, isMenuActive}) => {

  const navigate = useNavigate()

  return (
    <nav className={css.MobileNavbar}>
      <button onClick={() => setIsMenuActive(!isMenuActive)}>
        <MenuIcon />
      </button>

      <button onClick={() => navigate(RouteNames.ACCOUNT_ROUTE)}>
        <UserIcon />
      </button>

        <button
          id={css.UpIcon}
          onClick={() => window.location.href = '#header'}
        >
          <UpIcon />
        </button>

      <button
        onClick={() => navigate(RouteNames.BASKET_ROUTE)}
      >
        <CartIcon />
      </button>
      
      <button>
        <SearchIcon />
      </button>
    </nav>
  );
}

export default MobileNavbar;