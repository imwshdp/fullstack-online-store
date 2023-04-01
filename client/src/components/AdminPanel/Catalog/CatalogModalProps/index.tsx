import React, { ChangeEvent } from 'react';

import useAppSelector from 'hooks/useAppSelector';
import { FileWithId, ProductInfo } from 'store/slices/products/types';

import Button from 'components/UI/Button';
import CatalogModalProp from '../CatalogModalProp';
import CatalogModalImage from '../CatalogModalImage';
import ButtonLoader from 'components/General/ButtonLoader';
import TrashBin from 'resources/icons/TrashBin';
import css from "./index.module.css";

interface TProps {
  infoState: {
    info: ProductInfo[];
    setInfo: (state: ProductInfo[]) => void;
  };

  imagesState: {
    images: FileWithId[];
    setImages: (state: FileWithId[]) => void;
  };

  confirmDeletingImage: (id: number) => void;
  confirmDeletingProperty: (id: number) => void;
  confirmAddingNewProperties: () => void;
}

const CatalogModalProps: React.FC<TProps> = ({infoState, imagesState, confirmDeletingImage, confirmDeletingProperty, confirmAddingNewProperties}) => {

  const productsState = useAppSelector(state => state.products);
  const activeProduct = useAppSelector(state => state.products.activeProduct)

  const info = infoState.info, setInfo = infoState.setInfo;
  const images = imagesState.images, setImages = imagesState.setImages;

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
  
  return (
    <div className={css.CatalogModalPropsWrapper}>

      <h1>Редактирование характеристик</h1>
      {activeProduct?.info && activeProduct?.info.map(property =>
        <div
          className={css.CatalogModalPropRow}
          key={property.id}
        >
          <div onClick={() => confirmDeletingProperty(property.id)}>
            <TrashBin />
          </div>
          {property.title}: {property.description}
        </div>
      )}

      <h1>Добавление нового контента</h1>
      
      {info.map(i =>
        <CatalogModalProp
          key={i.id}
          changeName={(e: ChangeEvent) => changeInfo('title', (e.currentTarget as HTMLInputElement).value, i.id)}
          changeDescription={(e: ChangeEvent) => changeInfo('description', (e.currentTarget as HTMLInputElement).value, i.id)}
          removeInfo={() => removeInfo(i.id)}
        />
      )}

      {images.map(i =>
        <CatalogModalImage
          key={i.id}
          changeImage={(event: ChangeEvent) => changeImage(event, i.id)}
          removeImage={() => removeImage(i.id)}
        />
      )}

      <div className={css.AddInputsButtons}>
        <Button
          onclick={addInfo}
          width={'45%'}
          height={30}
          color='var(--lightgray)'
        >
          Добавить характеристику
        </Button>
        <Button
          onclick={addImage}
          width={'45%'}
          height={30}
          color='var(--lightgray)'
        >
          Добавить картинку
        </Button>
      </div>

      <Button
        width={'70%'}
        height={30}
        color='var(--applyColor)'
        onclick={confirmAddingNewProperties}
        disabled={productsState.loading ? true : false}
      >
        { productsState.loading ? <ButtonLoader/> : "Добавить новые характеристики и фотографии" }
      </Button>

      <h1>Удаление фотографий товара</h1>
      <div className={css.CatalogModalPicturesFeed}>
        {activeProduct?.image && activeProduct?.image.map(img =>
          !img.primary &&
          <div
            key={img.id}
            className={css.ImageWrapper}
          >
            <span
              className={css.ImageLabel}
              onClick={() => confirmDeletingImage(img.id)}
            >
              Удалить
            </span>
            <img
              onClick={() => confirmDeletingImage(img.id)}
              src={process.env.REACT_APP_API_URL as string + img.image}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CatalogModalProps;