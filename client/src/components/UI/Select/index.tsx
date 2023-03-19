import React from 'react';
import "./index.module.css"

interface TProps {
  children: string[];
  onchange: React.ChangeEventHandler<HTMLSelectElement>;
  width?: number | string;
}

const Select: React.FC<TProps> = ({children, onchange, width}) => {
  return (
    <select
      onChange={onchange}
      style={{width}}
    >
      {children.map( (option) =>
        <option
          key={option}
          value={option}
        >
          {option}
        </option>
      )}
    </select>
  );
}

export default Select;