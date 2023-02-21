import React from 'react';

import logotype from 'resources/assets/logo.png';
import css from "./index.module.css";

const Logo: React.FC = () => {
  return (
    <section className={css.Logo}>
      
      <a href="#" className={css.Logotype}>
        <img src={logotype} alt="logotype"></img>
      </a>

      <a href="#" className={css.Title}>
        <h1>
          <span>Alice Bunny</span>
          <span>Shop</span>
        </h1>
      </a>
      
    </section>
  );
}

export default Logo;