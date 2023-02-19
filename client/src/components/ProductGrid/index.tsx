import ProductItem from 'components/ProductItem';
import React from 'react';
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