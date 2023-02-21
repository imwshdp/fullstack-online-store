import { useState } from 'react';

interface ReturnedValue {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const useInput = (initialValue: string): ReturnedValue => {

  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return {
    value,
    onChange,
  }

}

export default useInput;