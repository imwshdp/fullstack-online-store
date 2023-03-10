import React from 'react';

import UpIcon from 'resources/icons/UpIcon';
import CartIcon from 'resources/icons/CartIcon';
import MenuIcon from 'resources/icons/MenuIcon';
import UserIcon from 'resources/icons/UserIcon';
import SearchIcon from 'resources/icons/SearchIcon';
import css from "./index.module.css";

interface TProps {
  setIsMenuActive: (state: boolean) => void;
  isMenuActive: boolean;
}

const MobileNavbar: React.FC<TProps> = ({setIsMenuActive, isMenuActive}) => {
  return (
    <nav className={css.MobileNavbar}>
      <button onClick={() => setIsMenuActive(!isMenuActive)}>
        <MenuIcon />
      </button>

      <button>
        <UserIcon />
      </button>

      <button id={css.UpIcon}>
        <UpIcon />
      </button>

      <button>
        <CartIcon />
      </button>
      
      <button>
        <SearchIcon />
      </button>
    </nav>
  );
}

export default MobileNavbar;