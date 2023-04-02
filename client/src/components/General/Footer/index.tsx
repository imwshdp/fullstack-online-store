import React from 'react';
import { useNavigate } from 'react-router';

import VkIcon from 'resources/icons/VkIcon';
import InstagramIcon from 'resources/icons/InstagramIcon';
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
        <a className={css.SocialIcon}>
          <VkIcon />
        </a>
        <a className={css.SocialIcon}>
          <InstagramIcon />
        </a>
      </div>
      
    </footer>
  );
}

export default Footer;