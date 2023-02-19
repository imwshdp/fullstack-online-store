import * as React from 'react';
import ProductGrid from 'components/ProductGrid';
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