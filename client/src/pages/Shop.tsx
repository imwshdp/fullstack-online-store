import React, { useEffect } from 'react';

import useAppDispatch from 'hooks/useAppDispatch';
import { fetchProducts } from 'store/slices/products/actions';

import ProductGrid from 'components/ShopComponents/ProductGrid';
import PageHeader from 'components/GeneralComponents/PageHeader';
import FilterPanel from 'components/ShopComponents/FilterPanel';

const Shop: React.FC = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts({categoryId: null}));
  }, [])

  return (
    <section className='Main'>
      <PageHeader>
        Товары
      </PageHeader>
      <FilterPanel />
      <ProductGrid />
    </section>
  );
}

export default Shop;