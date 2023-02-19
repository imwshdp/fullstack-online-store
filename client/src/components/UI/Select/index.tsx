import React from 'react';
import "./index.module.css"

interface TProps {
  children: string[];
}

const Select: React.FC<TProps> = ({children}) => {
  return (
    <select>
      {children.map( (option) =>
        <option key={option}>
          {option}
        </option>
      )}
    </select>
  );
}

export default Select;