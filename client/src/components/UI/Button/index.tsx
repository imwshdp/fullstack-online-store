import React, { MouseEventHandler } from 'react';
import "./index.module.css";

interface TProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  onclick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<TProps & React.PropsWithChildren> = ({children, width, height, color, onclick, disabled}) => {
  return (
    <button
      style={{width, height, backgroundColor: color}}
      onClick={onclick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;