import React, { useState } from 'react';

import useAppSelector from 'hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';
import { fetchProduct } from 'store/slices/products/actions';

import CatalogModal from 'components/AdminPanel/Catalog/CatalogModal';
import css from "./index.module.css";

interface TProps {
  header: string;
}

const CatalogSection: React.FC<TProps> = ({header}) => {

  const dispatch = useAppDispatch()
  const productsState = useAppSelector(state => state.products)

  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const openModal = (productId: number) => {
    dispatch(fetchProduct({ id: productId }))
    setModalVisible(true)
  }

  return (
    <section className={css.CatalogSection}>
      <h1>{header}</h1>

      <div className={css.Panel}>
        {productsState.products?.map(product =>
          <div
            key={product.id}
            className={css.Item}
            onClick={() => openModal(product.id)}
          >
            {product.name}
          </div>
        )}
      </div>

      <CatalogModal
        visible={modalVisible}
        setVisible={setModalVisible}
      />

    </section>
  );
}

export default CatalogSection;