import React, { ChangeEvent, useState } from 'react';

import useInput from 'hooks/useInput';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { setActiveCategory } from 'store/slices/categories';
import { createProduct } from 'store/slices/products/actions';
import { FileWithId, ProductInfo } from 'store/slices/products/types';

import Input from 'components/UI/Input';
import Select from 'components/UI/Select';
import Button from 'components/UI/Button';
import ProductModal from '../ProductModal';
import FileInput from 'components/UI/FileInput';
import ButtonLoader from 'components/General/ButtonLoader';
import css from "./index.module.css";

interface TProps {
  header: string;
}

const ProductSection: React.FC<TProps> = ({header}) => {

  // store dispatch and state
  const dispatch = useAppDispatch();
  const productsState = useAppSelector(state => state.products);
  const categoriesState = useAppSelector(state => state.categories);

  // panel states
  const productName = useInput('');
  const productPrice = useInput('');
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

  // modal state
  const openModal = () => setModalVisible(true);

  // dispatch function
  const addProduct = () => {
    const data = new FormData();
    
    data.append('name', productName.value)
    data.append('price', productPrice.value)
    data.append('categoryId', String(categoriesState.activeCategory?.id))
    data.append('imgDesktop', imgDesktop)
    data.append('imgMobile', imgMobile)
    data.append('info', JSON.stringify(info))

    for(let i = 0; i < images.length; i++)
      data.append('images', images[i].file)
    
    dispatch(createProduct(data));
  };

  // select list
  const categoriesList: string[] = [];
  if(categoriesState.categories) {
    categoriesList.push("Категория товара")
    categoriesState.categories.map(i => categoriesList.push(i.name))
  }

  const setNewActiveCategory = (e: any) => {
    let newActive
    categoriesState.categories?.forEach(category => {
      if(category.name == e.target.value) {
        newActive = category
      }
    })

    newActive
      ? dispatch(setActiveCategory(newActive))
      : dispatch(setActiveCategory(null))
  }

  return (
    <section className={css.ProductSection}>
      <h1>{header}</h1>

      <div className={css.Panel}>

        <Input {...productName}>Название товара</Input>
        <Input {...productPrice}>Цена товара</Input>

        <Select onchange={setNewActiveCategory} >
          {categoriesList}
        </Select>

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
            width={'60%'}
            onclick={openModal}
            height={30}
            color='var(--lightgray)'
          >
            Добавить характеристики и фото
          </Button>

          <Button
            color='var(--applyColor)'
            onclick={addProduct}
            width={120}
            height={30}
            disabled={productsState.loading ? true : false}
          >
            { productsState.loading ? <ButtonLoader/> : "Добавить" }
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