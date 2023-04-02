import React, { useEffect, useState } from 'react';

import useAppSelector from 'hooks/useAppSelector';
import { Product } from 'store/slices/products/types';

import Loader from 'components/General/Loader';
import ProductItem from 'components/Shop/ProductItem';
import css from './index.module.css';

interface TProps {
  nameFilter: string;
}

const ProductGrid: React.FC<TProps> = ({nameFilter}) => {

  const productsState = useAppSelector(state => state.products);
  const activeCategory = useAppSelector(state => state.categories.activeCategory);
  const [filteredList, setFilteredList] = useState<Product[] | null>(null)

  const filterList = () => {
    if(!productsState.products) return;
    let newState

    // filter by category
    activeCategory === null
    ? newState = productsState.products
    : newState = productsState.products.filter(product => product.categoryId === activeCategory?.id)

    // filter by name
    if(nameFilter) {
      newState = newState.filter(product => product.name.toLowerCase().includes(nameFilter.toLowerCase()))
    }

    // refresh state
    setFilteredList(newState)
  }

  useEffect(() => {
    filterList()
  }, [productsState.products, activeCategory, nameFilter])

  return (
    <main className={css.ProductsContainer}>
      {filteredList
      ?
        filteredList.map(item =>
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