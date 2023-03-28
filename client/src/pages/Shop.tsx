import React, { useEffect } from 'react';

import useInput from 'hooks/useInput';
import useAppDispatch from 'hooks/useAppDispatch';
import { fetchProducts } from 'store/slices/products/actions';

import ProductGrid from 'components/Shop/ProductGrid';
import FilterPanel from 'components/Shop/FilterPanel';
import PageHeader from 'components/General/PageHeader';

const Shop: React.FC = () => {
  const dispatch = useAppDispatch();

  const nameProductFilter = useInput('')

  useEffect(() => {
    dispatch(fetchProducts({categoryId: null}));
  }, [])

  return (
    <div className='Main'>
      <PageHeader>
        Товары
      </PageHeader>
      <FilterPanel
        {...nameProductFilter}
      />
      <ProductGrid
        nameFilter={nameProductFilter.value}
      />
    </div>
  );
}

export default Shop;