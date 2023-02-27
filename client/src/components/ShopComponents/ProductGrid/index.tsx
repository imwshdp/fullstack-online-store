import React from 'react';
import { Product } from 'store/slices/products/types';

import ProductItem from 'components/ShopComponents/ProductItem';
import Loader from 'components/GeneralComponents/Loader';
import css from './index.module.css';
import useAppSelector from 'hooks/useAppSelector';

const ProductGrid: React.FC = () => {

  const state = useAppSelector(state => state.products);

  return (
    <main className={css.ProductsContainer}>
      {state.products
      ?
        state.products.map(item =>
          <ProductItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            categoryId={item.categoryId}
            imgDesktop={item.imgDesktop}
            imgMobile={item.imgMobile}
          />
        )
      :
        <Loader />
      }
    </main>
  );
}

export default ProductGrid;