import React from 'react';
import { Product } from 'store/slices/products/types';

import ProductItem from 'components/ShopComponents/ProductItem';
import Loader from 'components/GeneralComponents/Loader';
import css from './index.module.css';

interface TProps {
  state: Product[] | null;
}

const ProductGrid: React.FC<TProps> = ({state}) => {

  return (
    <main className={css.ProductsContainer}>
      {state
      ?
        state.map(item =>
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