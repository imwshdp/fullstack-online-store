import { useState } from 'react';
import useDebounce from './useDebounce';

interface ReturnedValue {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const useInput = (initialValue: string): ReturnedValue => {

  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    // useDebounce(setValue(e.target.value), 500);
  }

  return {
    value,
    onChange,
  }
}

export default useInput;