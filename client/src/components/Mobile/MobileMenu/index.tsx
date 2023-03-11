import * as React from 'react';
import { useNavigate } from 'react-router';

import css from "./index.module.css";

interface ExtraLinks {
  value: string;
  link: string;
}

interface TProps {
  header: string;
  items: ExtraLinks[];
  isMenuActive: boolean;
  setIsMenuActive: (state: boolean) => void;
}

const MobileMenu: React.FC<TProps> = ({header, items, isMenuActive, setIsMenuActive}) => {

  const navigate = useNavigate();

  return (
    <div
      className={isMenuActive ? css.MenuActive : css.Menu}
      onClick={() => setIsMenuActive(false)}
    >
      
      <div className={css.Blur} />

      <div
        className={css.MenuContent}
        onClick={e => e.stopPropagation()}
      >

        <div className={css.Header}>
          {header}
        </div>

        <ul>
          {items.map( item =>
            <li
              key={item.link}
              className={css.Link}
              onClick={() => {
                setIsMenuActive(false);
                navigate(item.link);
              }}
            >
              {item.value}
            </li>
          )}
        </ul>
      </div>

    </div>
  );
}

export default MobileMenu;