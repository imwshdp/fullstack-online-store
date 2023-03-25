import React from 'react';
import { useNavigate } from 'react-router';

import { RouteNames } from 'router';

import Logotype from 'resources/assets/Logotype';
import css from "./index.module.css";

const Logo: React.FC = () => {

  const navigate = useNavigate()

  return (
    <section className={css.Logo}>
      
      <a
        onClick={() => navigate(RouteNames.SHOP_ROUTE)}
        className={css.Logotype}
      >
        <Logotype
          width={'100%'}
          height={'100%'}
        />
      </a>

      <a
        onClick={() => navigate(RouteNames.SHOP_ROUTE)}
        className={css.Title}
      >
        <h1>
          <span>Alice Bunny</span>
          <span>Shop</span>
        </h1>
      </a>
      
    </section>
  );
}

export default Logo;