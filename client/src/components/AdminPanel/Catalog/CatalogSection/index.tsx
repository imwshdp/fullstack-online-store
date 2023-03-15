import React, { useState } from 'react';

import useAppSelector from 'hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';
import { Product } from 'store/slices/products/types';
import { setActiveProduct } from 'store/slices/products';

import CatalogModal from 'components/AdminPanel/Catalog/CatalogModal';
import css from "./index.module.css";

interface TProps {
  header: string;
}

const CatalogSection: React.FC<TProps> = ({header}) => {

  const dispatch = useAppDispatch()
  const productsState = useAppSelector(state => state.products)

  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const openModal = (product: Product) => {
    dispatch(setActiveProduct(product))
    setModalVisible(true)
  }

  return (
    <div className={css.Section}>
      <h1>{header}</h1>

      <div className={css.Panel}>
        {productsState.products?.map(product =>
          <div
            key={product.id}
            className={css.Item}
            onClick={() => openModal(product)}
          >
            {product.name}
          </div>
        )}
      </div>

      <CatalogModal
        visible={modalVisible}
        setVisible={setModalVisible}
      />

    </div>
  );
}

export default CatalogSection;