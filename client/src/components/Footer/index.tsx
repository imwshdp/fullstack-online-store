import React from 'react';
import css from "./index.module.css";

const Footer = () => {
  return (
    <footer>

      <div className={css.LinksColumn}>
        <a href="#">Правила ухода</a>
        <a href="#">Как подобрать размер</a>
        <a href="#">Контакты</a>
        <a href="#">Доставка</a>
        <a href="#">Оферта</a>
      </div>

      <div className={css.SocialLinks}>
        <div className={css.SocialIcon}></div>
        <div className={css.SocialIcon}></div>
      </div>
      
    </footer>
  );
}

export default Footer;