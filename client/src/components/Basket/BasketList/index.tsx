import React, { useEffect, useState } from 'react';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { decreaseBasketProduct, fetchBasketProduct, increaseBasketProduct } from 'store/slices/basket/actions';

import Button from 'components/UI/Button';
import Counter from 'components/UI/Counter';
import css from './index.module.css';

interface TList {
  id: number;
  name: string;
  quantity: number;
}

const BasketList: React.FC = () => {

  const dispatch = useAppDispatch()
  const basket = useAppSelector(state => state.basket)
  const basketId = useAppSelector(state => state.basket.basketId)
  const products = useAppSelector(state => state.products.products)

  const [productsViewList, setProductsViewList] = useState<TList[]>([])

  const configureViewList = () => {
    setProductsViewList([])

    basket.products.forEach(basketProduct => {
      products?.forEach(product => {
        if(product.id === basketProduct.productId) {
          setProductsViewList(prev => [...prev, {
            id: product.id,
            name: product.name,
            quantity: basketProduct.quantity
          }])
        }
      })
    })
  }

  // fetch products in basket when basket fetched
  useEffect(() => {
    if(!basketId) return;
    dispatch(fetchBasketProduct({ basketId: basketId}))
  }, [basketId])

  // configure basket state after fetching products
  useEffect(() => {
    configureViewList()
  }, [basket])

  const findIndex = (id: number) => {
    let index = -1
    basket.products.forEach((product, i) => {
      if(product.productId === id) {
        index = i
      }
    })
    return index
  }

  // change state
  const increaseQuantity = (productId: number) => {
    if(!basketId) return;
    const index = findIndex(productId)

    dispatch(increaseBasketProduct({
      productId: productId,
      basketId: basketId,
      index: index,
    }))
  }

  const decreaseQuantity = (productId: number) => {
    if(!basketId) return;
    const index = findIndex(productId)

    dispatch(decreaseBasketProduct({
      productId: productId,
      basketId: basketId,
      index: index,
    }))
  }

  return (
    <section className={css.BasketListWrapper}>
      {productsViewList.map(product =>
        <div
          className={css.BasketListRow}
          key={product.name}
        >
          {product.name}

          <Counter
            increase={() => increaseQuantity(product.id)}
            decrease={() => decreaseQuantity(product.id)}
          >
            {product.quantity}
          </Counter>

        </div>
      )}

      <Button width={'30%'}>Оформить заказ</Button>
    </section>
  );
}

export default BasketList;