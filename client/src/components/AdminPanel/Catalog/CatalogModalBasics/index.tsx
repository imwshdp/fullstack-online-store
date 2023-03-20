import React, { ChangeEvent } from 'react';

import useAppSelector from 'hooks/useAppSelector';

import Input from 'components/UI/Input';
import Button from 'components/UI/Button';
import Select from 'components/UI/Select';
import FileInput from 'components/UI/FileInput';
import css from "./index.module.css";

interface TProps {
  newName: {
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  };
  newPrice: {
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  };
  categoriesList: string[];
  setActiveSelect: (state: string) => void;

  setNewImgMobile: (state: File) => void;
  setNewImgDesktop: (state: File) => void;

  confirmChanging: () => void;
}

const CatalogModalBasics: React.FC<TProps> = ({newName, newPrice, categoriesList, setActiveSelect, setNewImgMobile, setNewImgDesktop, confirmChanging}) => {

  // store states
  const categories = useAppSelector(state => state.categories.categories)
  const activeProduct = useAppSelector(state => state.products.activeProduct)

  const getCategoryName = (categoryId: number | undefined) => {
    const category = categories?.find(category => category.id === categoryId)
    return category?.name
  }

  const changeMobileImage = (e: ChangeEvent) => {
    const newFile = ((e.target as HTMLInputElement).files as FileList)[0];
    setNewImgMobile(newFile)
  }

  const changeDesktopImage = (e: ChangeEvent) => {
    const newFile = ((e.target as HTMLInputElement).files as FileList)[0];
    setNewImgDesktop(newFile)
  }
  
  return (
    <div className={css.CatalogModalWrapper}>
      <div className={css.ModalRow}>
        <span>{activeProduct?.name}</span>
        <span>Цена: {activeProduct?.price} &#8381;</span>
        <span>Категория: {getCategoryName(activeProduct?.categoryId)}</span>
      </div>

      <h1>Редактирование информации</h1>
      
      <Input {...newName} width={'100%'}>Изменить название</Input>
      <Input {...newPrice} width={'100%'}>Изменить цену</Input>
      
      <Select onchange={(e) => setActiveSelect(e.target.value)} width={'100%'} >
        {categoriesList}
      </Select>

      <FileInput
        width={'100%'}
        onChange={changeMobileImage}
        id={'newMobilePicture'}
        label={'Картинка для мобильной версии'}
      />

      <FileInput
        width={'100%'}
        onChange={changeDesktopImage}
        id={'newDesktopPicture'}
        label={'Картинка для полной версии'}
      />

      <Button width={'100%'} onclick={confirmChanging}>Изменить</Button>
    </div>
  );
}

export default CatalogModalBasics;