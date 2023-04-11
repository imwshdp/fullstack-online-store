import React from 'react';
import "./index.module.css";

interface TProps {
  children?: string | undefined;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const Textarea: React.FC<TProps> = ({children, value, onChange}) => {
  return (
    <textarea
      placeholder={children}
      value={value}
      onChange={onChange}
    />
  );
}

export default Textarea;