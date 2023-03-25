import React, { PropsWithChildren } from 'react';
import css from './index.module.css';

const Row: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={css.Row}>
      {children}
    </div>
  );
}

export default Row;