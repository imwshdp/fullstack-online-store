import React, { useEffect } from 'react';

import useAppDispatch from 'hooks/useAppDispatch';
import { fetchProducts } from 'store/slices/products/actions';

import ProductGrid from 'components/Shop/ProductGrid';
import PageHeader from 'components/General/PageHeader';
import FilterPanel from 'components/Shop/FilterPanel';
import { fetchBasket } from 'store/slices/basket/actions';
import useAppSelector from 'hooks/useAppSelector';

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