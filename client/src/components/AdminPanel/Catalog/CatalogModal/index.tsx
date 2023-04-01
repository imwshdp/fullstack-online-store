import React, {useEffect, useState} from 'react';

import useInput from 'hooks/useInput';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { setActiveProduct } from 'store/slices/products';
import { changeProductBasics, changeProductExtra, deleteImage, deleteInfo, deleteProduct } from 'store/slices/products/actions';

import CatalogModalProps from '../CatalogModalProps';
import CatalogModalBasics from '../CatalogModalBasics';
import css from "./index.module.css";
import { FileWithId, ProductInfo } from 'store/slices/products/types';
import Button from 'components/UI/Button';
import { useNavigate } from 'react-router';
import { RouteNames } from 'router';
import ButtonLoader from 'components/General/ButtonLoader';

interface TProps {
  visible: boolean;
  setVisible: (newState: boolean) => void;
}

const CatalogModal: React.FC<TProps> = ({visible, setVisible}) => {
  
  const dispatch = useAppDispatch()
  const productsState = useAppSelector(state => state.products)
  const categories = useAppSelector(state => state.categories.categories)
  const activeProduct = useAppSelector(state => state.products.activeProduct)

  // new states
  const newName = useInput('')
  const newPrice = useInput('')
  
  const [activeSelect, setActiveSelect] = useState<string | null>(null)
  const [newImgMobile, setNewImgMobile] = useState<File | null>(null)
  const [newImgDesktop, setNewImgDesktop] = useState<File | null>(null)

  const [info, setInfo] = useState<ProductInfo[]>([]);
  const [images, setImages] = useState<FileWithId[]>([]);

  // confirm changes button onclick functions
  const confirmChangingBasics = () => {
    const data = new FormData();

    data.append('id', String(activeProduct?.id))
    
    if(newName.value) data.append('name', newName.value)
    if(newPrice.value) data.append('price', newPrice.value)

    if(activeSelect) {
      if(!categories) return; 
      for(let category of categories)
        if(category.name === activeSelect) {
          console.log(category.id, String(category.id))
          data.append('categoryId', String(category.id))
        }
    }

    if(newImgMobile) data.append('imgMobile', newImgMobile)
    if(newImgDesktop) data.append('imgDesktop', newImgDesktop)

    dispatch(changeProductBasics(data))
  }

  const confirmDeletingImage = (id: number) => {
    if(window.confirm("Вы действительно хотите подтвердить удаление изображения товара?")) {
      dispatch(deleteImage({id: id}))
    }
  }

  const confirmDeletingProperty = (id: number) => {
    if(window.confirm("Вы действительно хотите подтвердить удаление характеристики товара?")) {
      dispatch(deleteInfo({id: id}))
    }
  }

  const confirmAddingNewProperties = () => {
    if(window.confirm("Вы действительно хотите подтвердить добавление контента для товара?")) {
      const data = new FormData();

      data.append('id', String(activeProduct?.id))
      data.append('info', JSON.stringify(info))
      for(let i = 0; i < images.length; i++)
        data.append('images', images[i].file)
      
      dispatch(changeProductExtra(data))
    }
  }

  // handle modal state
  const handleClosing = () => {
    setVisible(false)
    dispatch(setActiveProduct(null))
  }

  // select list
  const categoriesList: string[] = [];
  if(categories) {
    categoriesList.push("Выбрать новую категорию")
    categories.map(i => categoriesList.push(i.name))
  }

  const deleteItem = () => {
    if(!activeProduct) return;
    if(window.confirm("Вы действительно хотите подтвердить удаление товара?")) {
      dispatch(deleteProduct({ id: activeProduct.id }))
      handleClosing()
    }
  }

  // modal classes handling
  const rootClasses = [css.Modal];
  if(visible) {
    rootClasses.push(css.active);
  }

  return (
    <div
      className={rootClasses.join(" ")}
      onClick={handleClosing}
    >
      <div className={css.ModalContent} onClick={(e) => e.stopPropagation()}>
        <CatalogModalBasics
          newName={newName}
          newPrice={newPrice}
          categoriesList={categoriesList}
          setActiveSelect={setActiveSelect}

          setNewImgMobile={setNewImgMobile}
          setNewImgDesktop={setNewImgDesktop}

          confirmChanging={confirmChangingBasics}
        />

        <CatalogModalProps
          infoState={{ info, setInfo }}
          imagesState={{ images, setImages }}

          confirmDeletingImage={confirmDeletingImage}
          confirmDeletingProperty={confirmDeletingProperty}
          confirmAddingNewProperties={confirmAddingNewProperties}
        />

        <Button
          onclick={deleteItem}
          disabled={productsState.loading ? true : false}
          color='var(--cancelColor)'
          width={'70%'}
          height={30}
        >
          { productsState.loading ? <ButtonLoader/> : "Удалить товар" }
        </Button>

      </div>
    </div>
  );
}

export default CatalogModal;