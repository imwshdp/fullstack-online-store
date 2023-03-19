import React, {useState} from 'react';

import useInput from 'hooks/useInput';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { setActiveProduct } from 'store/slices/products';
import { changeProduct } from 'store/slices/products/actions';

import CatalogModalProps from '../CatalogModalProps';
import CatalogModalBasics from '../CatalogModalBasics';
import css from "./index.module.css";

interface TProps {
  visible: boolean;
  setVisible: (newState: boolean) => void;
}

const CatalogModal: React.FC<TProps> = ({visible, setVisible}) => {
  
  const dispatch = useAppDispatch()
  const categories = useAppSelector(state => state.categories.categories)
  const activeProduct = useAppSelector(state => state.products.activeProduct)

  // new states
  const newName = useInput('')
  const newPrice = useInput('')
  const [activeSelect, setActiveSelect] = useState<string | null>(null)
  const [newImgMobile, setNewImgMobile] = useState<File | null>(null)
  const [newImgDesktop, setNewImgDesktop] = useState<File | null>(null)


  const confirmChanging = () => {
    const data = new FormData();

    data.append('id', String(activeProduct?.id))
    if(newName.value) data.append('name', newName.value)
    if(newPrice.value) data.append('price', newPrice.value)

    if(activeSelect) {
      if(!categories) return; 
      for(let category of categories) {
        if(category.name === activeSelect) {
          console.log(category.id, String(category.id))
          data.append('categoryId', String(category.id))
        }
      }
    }

    if(newImgMobile) data.append('imgMobile', newImgMobile)
    if(newImgDesktop) data.append('imgDesktop', newImgDesktop)

    dispatch(changeProduct(data))
  }

  const handleClosing = () => {
    setVisible(false)
    dispatch(setActiveProduct(null))
  }

  const categoriesList: string[] = [];
  if(categories) {
    categoriesList.push("Выбрать новую категорию")
    categories.map(i => categoriesList.push(i.name))
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

          confirmChanging={confirmChanging}
        />

        <CatalogModalProps />

      </div>

    </div>
  );
}

export default CatalogModal;