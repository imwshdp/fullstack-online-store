import React, { useState } from 'react';
import Button from 'components/UI/Button';
import { ProductInfo } from 'store/slices/products/types';
import css from "./index.module.css";
import Input from 'components/UI/Input';

interface TProps {
  visible: boolean;
  setVisible: (newState: boolean) => void;
}

const ProductAddingModal: React.FC<TProps> = ({visible, setVisible}) => {

  // Modal classes handling
  const rootClasses = [css.Modal];
  if(visible) {
    rootClasses.push(css.active);
  }

  // states of inputs
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // info's state
  const [info, setInfo] = useState<ProductInfo[]>([]);

  // changing state of info
  const addInfo = () => setInfo([...info, {
    title: '',
    description: '',
    id: Date.now(),
  }])

  const removeInfo = (id: number) => setInfo(info.filter(i => i.id !== id))

  return (
    <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
      
      <div className={css.ModalContent} onClick={(e) => e.stopPropagation()}>
        <h1>Характеристики товара</h1>

        {info.map(i =>
          <div
            className={css.NewProp}
            key={i.id}
          >
            <Input>
              Название характеристики
            </Input>
            <Input>
              Описание
            </Input>
            <Button
              color='var(--cancelColor)'
              onclick={() => removeInfo(i.id)}
            >
              Удалить
            </Button>
          </div>  
        )}

        <Button
          onclick={addInfo}
        >
          Добавить поля для еще одной характеристики
        </Button>
      </div>

    </div>
  );
}

export default ProductAddingModal;