import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { setActiveProduct } from 'store/slices/products';
import { fetchProduct } from 'store/slices/products/actions';

import Loader from 'components/General/Loader';
import PageHeader from 'components/General/PageHeader';
import ProductLayout from 'components/Product/ProductLayout';

const Product: React.FC = () => {

  const { id } = useParams()
  
  const dispatch = useAppDispatch()
  const activeProduct = useAppSelector(state => state.products)

  useEffect(() => {
    if(!id) return;
    dispatch(fetchProduct({ id: +id }))

    return () => {
      dispatch(setActiveProduct(null))
    }
  }, [])

  return (
    <section className='Main'>
      <PageHeader />

      {activeProduct.loading
        ? <Loader />
        : <ProductLayout />
      }
    </section>
  );
}

export default Product;