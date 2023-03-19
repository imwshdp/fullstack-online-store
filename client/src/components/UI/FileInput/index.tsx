import React from 'react';
import "./index.module.css";

interface TProps {
  width?: number | string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  id?: string;
  label?: string;
}

const FileInput: React.FC<TProps> = ({width, onChange, id, label}) => {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={'file'}
        id={id}
        onChange={onChange}
        style={{width}}
      >
      </input>
    </>
  );
}

export default FileInput;