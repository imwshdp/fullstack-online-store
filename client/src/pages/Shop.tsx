import React, { useEffect } from 'react';

import useAppSelector from 'hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';
import { fetchProducts } from 'store/slices/products/actions';

import ProductGrid from 'components/ShopComponents/ProductGrid';
import PageHeader from 'components/GeneralComponents/PageHeader';
import FilterPanel from 'components/ShopComponents/FilterPanel';

const Shop = () => {

  const dispatch = useAppDispatch();
  const productsState = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts({categoryId: null}));
  }, [])

  return (
    <section className='Main'>
      <PageHeader>
        Товары
      </PageHeader>
      <FilterPanel />
      <ProductGrid
        state={productsState.products}
      />
    </section>
  );
}

export default Shop;