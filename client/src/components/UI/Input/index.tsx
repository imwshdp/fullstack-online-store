import React from 'react';
import "./index.module.css";

interface TProps {
  children?: string | undefined;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  borderColor?: string;
  isPassword?: boolean;
}

const Input: React.FC<TProps> = ({children, value, onChange, borderColor, isPassword}) => {
  return (
    <input
      placeholder={children}
      value={value}
      onChange={onChange}
      style={{borderColor: borderColor}}
      type={isPassword ? "password" : ""}
    >
    </input>
  );
}

export default Input;