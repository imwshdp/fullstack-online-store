import React from 'react';
import "./index.module.css";

interface TProps {
  children: string | undefined;
}

const Input: React.FC<TProps> = ({children}) => {
  return (
    <input placeholder={children}>
    </input>
  );
}

export default Input;