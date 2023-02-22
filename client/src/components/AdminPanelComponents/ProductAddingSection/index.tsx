import React, { useState } from 'react';

import ButtonLoader from 'components/GeneralComponents/ButtonLoader';
import Button from 'components/UI/Button';
import Input from 'components/UI/Input';
import useAppDispatch from 'hooks/useAppDispatch';
import useInput from 'hooks/useInput';

import { ProductsState } from 'store/slices/products/types';

import css from "./index.module.css";
import { createProduct } from 'store/slices/products/actions';

interface TProps {
  state: ProductsState;
  header: string;
}

const ProductAddingSection: React.FC<TProps> = ({state, header}) => {

  const dispatch = useAppDispatch();

  const productName = useInput('');
  const productPrice = useInput('');
  const productCategoryId = useInput('');

  const [imgMobile, setImageMobile] = useState<File>({} as File);
  const [imgDesktop, setImageDesktop] = useState<File>({} as File);

  const selectDesktopFile = (e: any) => {
    setImageDesktop(e.target.files[0])
  }

  const selectMobileFile = (e: any) => {
    setImageMobile(e.target.files[0])
  }

  // callback for button
  const applyProduct = () => {
    const data = {
      name: productName.value,
      price: +productPrice.value,
      categoryId: +productCategoryId.value,

      imgDesktop: imgDesktop,
      imgMobile: imgMobile,
    }

    dispatch(createProduct(data));
  };

  const isLoading = state.loading;

  return (
    <div className={css.AddProductSectionWrapper}>
      <h1>{header}</h1>

      <div>
        <Input {...productName}>
          Название товара
        </Input>

        <Input {...productPrice}>
          Цена товара
        </Input>

        <Input {...productCategoryId}>
          Идентификатор категории
        </Input>

        <label htmlFor="imgDesktop">Картинка для полной версии (1x1)</label>
        <input
          type="file"
          id="imgDesktop"
          onChange={selectDesktopFile}
        >
        </input>

        <label htmlFor="imgMobile">Картинка для мобильной версии (16x9)</label>
        <input
          type="file"
          id="imgMobile"
          onChange={selectMobileFile}
        >
        </input>

        <Button
          color='var(--applyColor)'
          onclick={applyProduct}
          width={80}
        >
          { isLoading
            ? <ButtonLoader/>
            : "Добавить"
          }
        </Button>
      </div>
    </div>
  );
}

export default ProductAddingSection;