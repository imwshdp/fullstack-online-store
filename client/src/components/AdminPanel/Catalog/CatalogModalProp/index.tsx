import React, { ChangeEvent } from 'react';

import Input from 'components/UI/Input';
import Row from 'components/General/Row';
import Button from 'components/UI/Button';

interface TProps {
  changeName: (e: ChangeEvent) => void;
  changeDescription: (e: ChangeEvent) => void;
  removeInfo: () => void;
}

const CatalogModalProp: React.FC<TProps> = ({changeName, changeDescription, removeInfo}) => {
  return (
    <Row>
      <Input
        width={'35%'}
        onChange={changeName}
      >
        Название характеристики
      </Input>

      <Input
        width={'35%'}
        onChange={changeDescription}
      >
        Описание
      </Input>

      <Button
        width={'20%'}
        height={30}
        color='var(--cancelColor)'
        onclick={removeInfo}
      >
        Удалить
      </Button>
    </Row>
  );
}

export default CatalogModalProp;