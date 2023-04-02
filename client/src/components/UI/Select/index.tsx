import React from 'react';
import css from "./index.module.css"

interface TProps {
  children: string[];
  onchange: React.ChangeEventHandler<HTMLSelectElement>;
  width?: number | string;
}

const Select: React.FC<TProps> = ({children, onchange, width}) => {
  return (
    <select
      className={css.Select}
      onChange={onchange}
      style={{width}}
    >
      {children.map( (option) =>
        <option
          className={css.Option}
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