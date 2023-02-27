import React, { ChangeEvent, useState } from 'react';

import useInput from 'hooks/useInput';
import useAppDispatch from 'hooks/useAppDispatch';
import { createProduct } from 'store/slices/products/actions';
import { FileWithId, ProductInfo, ProductsState } from 'store/slices/products/types';

import ProductModal from '../ProductModal';
import Input from 'components/UI/Input';
import FileInput from 'components/UI/FileInput';
import Button from 'components/UI/Button';
import ButtonLoader from 'components/GeneralComponents/ButtonLoader';
import css from "./index.module.css";
import useAppSelector from 'hooks/useAppSelector';

interface TProps {
  header: string;
}

const ProductSection: React.FC<TProps> = ({header}) => {

  // store dispatch and selector
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.categories);

  // panel states
  const productName = useInput('');
  const productPrice = useInput('');
  const productCategoryId = useInput('');
  const [imgMobile, setImageMobile] = useState<File>({} as File);
  const [imgDesktop, setImageDesktop] = useState<File>({} as File);

  // modal visibility
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  
  // modal content
  const [info, setInfo] = useState<ProductInfo[]>([]);
  const [images, setImages] = useState<FileWithId[]>([]);

  // state changing functions
  const selectDesktopFile = (event: ChangeEvent) => {
    const files = (event.target as HTMLInputElement).files as FileList;
    setImageDesktop(files[0]);
  }

  const selectMobileFile = (event: ChangeEvent) => {
    const files = (event.target as HTMLInputElement).files as FileList;
    setImageMobile(files[0]);
  }

  const openModal = () => setModalVisible(true);

  // requesting function
  const addProduct = () => {
    const data = new FormData();

    data.append('name', productName.value)
    data.append('price', productPrice.value)
    data.append('categoryId', productCategoryId.value)
    data.append('imgDesktop', imgDesktop)
    data.append('imgMobile', imgMobile)
    data.append('info', JSON.stringify(info))

    for(let i = 0; i < images.length; i++)
      data.append('images', images[i].file)
    
    dispatch(createProduct(data));
  };

  // loading variable state
  const isLoading = state.loading;

  return (
    <section className={css.Section}>
      <h1>{header}</h1>

      <div className={css.Panel}>

        <Input {...productName}>Название товара</Input>
        <Input {...productPrice}>Цена товара</Input>
        <Input {...productCategoryId}>Идентификатор категории</Input>

        <label htmlFor="imgDesktop">Картинка для полной версии (1x1)</label>
        <FileInput
          onChange={selectDesktopFile}
          id="imgDesktop"
        />

        <label htmlFor="imgMobile">Картинка для мобильной версии (16x9)</label>
        <FileInput
          onChange={selectMobileFile}
          id="imgMobile"
        />

        <div className={css.Buttons}>
          <Button
            width={'50%'}
            onclick={openModal}
          >
            Добавить характеристики и фото
          </Button>

          <Button
            color='var(--applyColor)'
            onclick={addProduct}
            width={80}
          >
            { isLoading ? <ButtonLoader/> : "Добавить" }
          </Button>
        </div>

        <ProductModal
          visible={modalVisible}
          setVisible={setModalVisible}
          infoState={{ info, setInfo }}
          imagesState={{ images, setImages }}
        />
      </div>
    </section>
  );
}

export default ProductSection;