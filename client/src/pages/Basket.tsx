import React, { useEffect, useState } from 'react';
import useAppSelector from 'hooks/useAppSelector';
import Button from 'components/UI/Button';
import useAppDispatch from 'hooks/useAppDispatch';
import { decreaseBasketProduct, fetchBasketProduct, increaseBasketProduct } from 'store/slices/basket/actions';

interface TList {
  id: number;
  name: string;
  quantity: number;
}

const Basket: React.FC = () => {

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
    <div>
      {productsViewList.map(product =>
        <div
          key={product.name}
          style={{display: 'flex', flexFlow: 'row nowrap'}}
        >
          {product.name} : {product.quantity}
          <Button onclick={() => increaseQuantity(product.id)} >+</Button>
          <Button onclick={() => decreaseQuantity(product.id)} >-</Button>
        </div>
      )}
    </div>
  );
}

export default Basket;