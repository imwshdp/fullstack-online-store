import React from 'react';
import "./index.module.css"

interface TProps {
  children: string[];
  onchange: React.ChangeEventHandler<HTMLSelectElement>;
}

const Select: React.FC<TProps> = ({children, onchange}) => {
  return (
    <select
      onChange={onchange}
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