import React, { PropsWithChildren } from 'react';
import css from './index.module.css';

interface TProps {
  increase: () => void;
  decrease: () => void;
}

const Counter: React.FC<TProps & PropsWithChildren> = ({increase, decrease, children}) => {
  return (
    <div className={css.Counter}>
      <button onClick={decrease}>-</button>
      <span>{children}</span>
      <button onClick={increase}>+</button>
    </div>
  );
}

export default Counter;