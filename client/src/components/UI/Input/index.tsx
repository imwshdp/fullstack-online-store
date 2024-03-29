import React, { PropsWithChildren, forwardRef } from 'react';
import css from "./index.module.css";

interface TProps {
  children?: string | undefined;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  
  width?: number | string;
  height?: number | string;

  borderColor?: string;
  isPassword?: boolean;
}

const Input: React.FC<TProps> = ({children, value, onChange, width, height, borderColor, isPassword}) => {
  return (
    <input
      className={css.Input}
      placeholder={children}
      value={value}
      onChange={onChange}
      style={{
        height: height ? height : "inherit",
        width: width ? width : "inherit",
        borderColor: borderColor
      }}
      type={isPassword ? "password" : "text"}
    >
    </input>
  );
}

export default Input;