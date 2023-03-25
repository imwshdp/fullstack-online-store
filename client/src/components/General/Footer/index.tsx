import React from 'react';
import { useNavigate } from 'react-router';
import css from "./index.module.css";

interface TProps {
  links: {
    value: string;
    link: string;
  }[];
}

const Footer: React.FC<TProps> = ({links}) => {

  const navigate = useNavigate()

  return (
    <footer>

      <div className={css.LinksColumn}>
        {/* <a href="#">Правила ухода</a>
        <a href="#">Как подобрать размер</a>
        <a href="#">Контакты</a>
        <a href="#">Доставка</a>
        <a href="#">Оферта</a> */}
        {links.map(link =>
          <a
            key={link.link}
            onClick={() => navigate(link.link)}
          >
            {link.value}
          </a>  
        )}
      </div>

      <div className={css.SocialLinks}>
        <div className={css.SocialIcon}></div>
        <div className={css.SocialIcon}></div>
      </div>
      
    </footer>
  );
}

export default Footer;