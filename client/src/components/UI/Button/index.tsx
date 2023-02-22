import React, { useEffect } from 'react';
import "./index.module.css";

interface TProps {
  width?: number;
  height?: number;
  color?: string;

  onclick?: () => void;
}

const Button: React.FC<TProps & React.PropsWithChildren> = ({children, width, height, color, onclick}) => {
  return (
    <button
      style={{minWidth: width, minHeight: height, backgroundColor: color}}
      onClick={onclick}
    >
      {children}
    </button>
  );
}

export default Button;