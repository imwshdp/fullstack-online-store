import React from 'react';
import "./index.module.css";

interface TProps {
  children?: string | undefined;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: React.FC<TProps> = ({children, value, onChange}) => {

  return (
    <input
      placeholder={children}
      value={value}
      onChange={onChange}
    >
    </input>
  );
}

export default Input;