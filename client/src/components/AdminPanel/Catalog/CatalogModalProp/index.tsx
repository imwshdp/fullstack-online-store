import React, { ChangeEvent } from 'react';

import Input from 'components/UI/Input';
import Button from 'components/UI/Button';
import css from './index.module.css'

interface TProps {
  changeName: (e: ChangeEvent) => void;
  changeDescription: (e: ChangeEvent) => void;
  removeInfo: () => void;
}

const CatalogModalProp: React.FC<TProps> = ({changeName, changeDescription, removeInfo}) => {
  return (
    <div className={css.NewProp} >
      <Input
        width={'40%'}
        onChange={changeName}
      >
        Название характеристики
      </Input>

      <Input
        width={'40%'}
        onChange={changeDescription}
      >
        Описание
      </Input>

      <Button
        width={'15%'}
        color='var(--cancelColor)'
        onclick={removeInfo}
      >
        Удалить
      </Button>
    </div>
  );
}

export default CatalogModalProp;