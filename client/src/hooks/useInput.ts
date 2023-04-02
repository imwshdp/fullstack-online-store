import { useState } from 'react';

interface ReturnedValue {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  reset: () => void;
}

const useInput = (initialValue: string): ReturnedValue => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  const reset = () => setValue(initialValue)

  return { value, onChange, reset }
}

export default useInput;