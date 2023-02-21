import * as React from 'react';
import ProductGrid from 'components/ShopComponents/ProductGrid';
import PageHeader from 'components/PageHeader';
import FilterPanel from 'components/FilterPanel';

const Shop = () => {
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