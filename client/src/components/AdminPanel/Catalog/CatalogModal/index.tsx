import React from 'react';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { setActiveProduct } from 'store/slices/products';

import css from "./index.module.css";

interface TProps {
  visible: boolean;
  setVisible: (newState: boolean) => void;
}

const CatalogModal: React.FC<TProps> = ({visible, setVisible}) => {

  const dispatch = useAppDispatch();
  const productState = useAppSelector(state => state.products.activeProduct)

  const handleClosing = () => {
    setVisible(false)
    dispatch(setActiveProduct(null))
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
        <p>{productState?.name}</p>
        <p>{productState?.price}</p>
        <p>{productState?.categoryId}</p>
      </div>

    </div>
  );
}

export default CatalogModal;