import * as React from 'react';
import "./index.module.css";

interface TProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  id?: string;
}

const FileInput: React.FC<TProps> = ({onChange, id}) => {

  return (
    <input
      type={'file'}
      id={id}
      onChange={onChange}
    >
    </input>
  );
}

export default FileInput;