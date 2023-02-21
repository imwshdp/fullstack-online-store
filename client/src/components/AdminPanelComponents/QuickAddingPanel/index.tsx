import * as React from 'react';

import Button from 'components/UI/Button';
import Input from 'components/UI/Input';

import css from "./index.module.css";

interface TProps {
  inputState: {
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  }
  placeholder: string;
}

const QuickAddingPanel: React.FC<TProps> = ({inputState, placeholder}) => {
  return (
    <div className={css.Item}>
      <Input
        {...inputState}
      >
        {placeholder}
      </Input>
      
      <Button color='lightgreen'>
        Добавить
      </Button>

      <Button color='tomato'>
        Удалить
      </Button>
    </div>
  );
}

export default QuickAddingPanel;