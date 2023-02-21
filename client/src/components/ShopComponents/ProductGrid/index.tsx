import React from 'react';
import ProductItem from 'components/ShopComponents/ProductItem';
import css from './index.module.css';

const ProductGrid: React.FC = () => {

  return (
    <main className={css.ProductsContainer}>
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
    </main>
  );
}

export default ProductGrid;