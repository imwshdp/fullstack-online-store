import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { setActiveProduct } from 'store/slices/products';
import { fetchProduct, fetchReviews } from 'store/slices/products/actions';

import Loader from 'components/General/Loader';
import PageHeader from 'components/General/PageHeader';
import ProductLayout from 'components/Product/ProductLayout';
import ReviewSection from 'components/Product/ReviewSection';

const Product: React.FC = () => {

  const { id } = useParams()
  
  const dispatch = useAppDispatch()
  const productsState = useAppSelector(state => state.products)

  useEffect(() => {
    if(!id) return;
    dispatch(fetchProduct({ id: +id }))

    // remove active product while quitting page
    return () => {
      dispatch(setActiveProduct(null))
    }
  }, [])

  return (
    <div className='Main'>
      <PageHeader />

      {productsState.loading
        ? <Loader />
        :
          <>
            <ProductLayout />
            <ReviewSection />
          </>
      }
    </div>
  );
}

export default Product;