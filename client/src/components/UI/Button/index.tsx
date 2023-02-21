import * as React from 'react';
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
      style={{width, height, backgroundColor: color}}
      onClick={() => onclick}
    >
      {children}
    </button>
  );
}

export default Button;