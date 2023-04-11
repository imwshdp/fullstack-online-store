import React from 'react';
import css from "./index.module.css"

const ButtonLoader: React.FC = () => {
  return (
    <div className={css.MobileLoaderWrapper}>
      <div className={css.ButtonLoader} />
    </div>
  );
}

export default ButtonLoader;