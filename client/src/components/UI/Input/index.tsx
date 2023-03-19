import React from 'react';
import "./index.module.css";

interface TProps {
  children?: string | undefined;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  width?: number | string;
  borderColor?: string;
  isPassword?: boolean;
}

const Input: React.FC<TProps> = ({children, value, onChange, width, borderColor, isPassword}) => {
  return (
    <input
      placeholder={children}
      value={value}
      onChange={onChange}
      style={{borderColor: borderColor, width}}
      type={isPassword ? "password" : ""}
    >
    </input>
  );
}

export default Input;