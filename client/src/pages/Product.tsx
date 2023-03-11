import React, { useEffect } from 'react';
import PageHeader from 'components/General/PageHeader';
import PicturesFeed from 'components/Product/PicturesFeed';
import PropsAside from 'components/Product/PropsAside';
import useAppDispatch from 'hooks/useAppDispatch';
import { useParams } from 'react-router-dom';
import { fetchProduct } from 'store/slices/products/actions';
import { setActiveProduct } from 'store/slices/products';
import useAppSelector from 'hooks/useAppSelector';
import Loader from 'components/General/Loader';

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
      ?
        <Loader />
      :        
        <div style={{
          display: 'flex',
          flexFlow: 'row',
          width: '70%',
          marginTop: '3%',
          marginLeft: '15%',
          justifyContent: 'space-between'
        }}>
          <PicturesFeed />
          <PropsAside />
        </div>
      }
    </section>
  );
}

export default Product;