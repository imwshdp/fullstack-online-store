import React, { ChangeEvent, useEffect } from 'react';

import { FileWithId, ProductInfo } from 'store/slices/products/types';

import Button from 'components/UI/Button';
import ProductModalProp from 'components/AdminPanel/Product/ProductModalProp';
import ProductModalImage from 'components/AdminPanel/Product/ProductModalImage';
import css from "./index.module.css";
import { setActiveProduct } from 'store/slices/products';

interface TProps {
  visible: boolean;
  setVisible: (newState: boolean) => void;
  
  infoState: {
    info: ProductInfo[];
    setInfo: (state: ProductInfo[]) => void;
  };

  imagesState: {
    images: FileWithId[];
    setImages: (state: FileWithId[]) => void;
  };
}

const ProductModal: React.FC<TProps> = ({visible, setVisible, infoState, imagesState}) => {

  const info = infoState.info, setInfo = infoState.setInfo;
  const images = imagesState.images, setImages = imagesState.setImages;

  // modal classes handling
  const rootClasses = [css.Modal];
  if(visible) {
    rootClasses.push(css.active);
  }

  // changing state of info
  const addInfo = () => setInfo([...info, {
    title: '',
    description: '',
    id: Date.now(),
  }])

  const changeInfo = (key: string, newValue: string, id: number) => {
    setInfo(info.map(i =>
      i.id === id ? {...i, [key]: newValue} : i
    ))
  }

  // changing state of images
  const addImage = () => setImages([...images, {
    file: {} as File,
    id: Date.now(),
  }])

  const changeImage = (e: ChangeEvent, id: number) => {
    const newFile = ((e.target as HTMLInputElement).files as FileList)[0];
    setImages(images.map(i =>
      i.id === id ? {...i, file: newFile} : i
    ))
  }

  // remove row with file or data inputs
  const removeInfo = (id: number) => setInfo(info.filter(i => i.id !== id))
  const removeImage = (id: number) => setImages(images.filter(i => i.id !== id))

  // remove active product while closing modal
  useEffect(() => {
    return function() {
      setActiveProduct(null)
    }
  }, [])

  return (
    <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>

      <div className={css.ModalContent} onClick={(e) => e.stopPropagation()}>

        <h1>Характеристики товара</h1>
        {info.map(i =>
          <ProductModalProp
            key={i.id}
            changeName={(e: ChangeEvent) => changeInfo('title', (e.currentTarget as HTMLInputElement).value, i.id)}
            changeDescription={(e: ChangeEvent) => changeInfo('description', (e.currentTarget as HTMLInputElement).value, i.id)}
            removeInfo={() => removeInfo(i.id)}
          />
        )}

        <h1>Фото товара</h1>
        {images.map(i =>
          <ProductModalImage
            key={i.id}
            changeImage={(event: ChangeEvent) => changeImage(event, i.id)}
            removeImage={() => removeImage(i.id)}
          />
        )}

        <div className={css.AddInputsButtons}>
          <Button
            onclick={addInfo}
            color='var(--lightgray)'
            height={30}
          >
            Добавить характеристику
          </Button>

          <Button
            onclick={addImage}
            color='var(--lightgray)'
            height={30}
          >
            Добавить картинку
          </Button>
        </div>

        <Button
          onclick={() => setVisible(false)}
          color='var(--cancelColor)'
          height={30}
        >
          Закрыть
        </Button>

      </div>
    </div>
  );
}

export default ProductModal;