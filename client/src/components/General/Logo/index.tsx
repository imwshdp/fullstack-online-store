import React from 'react';
import { useNavigate } from 'react-router';

import { RouteNames } from 'router';

import logotype from 'resources/assets/logo.png';
import css from "./index.module.css";

const Logo: React.FC = () => {

  const navigate = useNavigate()

  return (
    <section className={css.Logo}>
      
      <a
        onClick={() => navigate(RouteNames.REDIRECT_ROUTE)}
        className={css.Logotype}
      >
        <img src={logotype} alt="logotype"></img>
      </a>

      <a
        onClick={() => navigate(RouteNames.REDIRECT_ROUTE)}
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