import React, { useEffect, useState } from 'react';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { createOrder } from 'store/slices/orders/actions';
import { decreaseBasketProduct, fetchBasketProduct, increaseBasketProduct } from 'store/slices/basket/actions';

import Button from 'components/UI/Button';
import Counter from 'components/UI/Counter';
import css from './index.module.css';
import Loader from 'components/General/Loader';
import ButtonLoader from 'components/General/ButtonLoader';
import EditIcon from 'resources/icons/EditIcon';

interface TList {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

const BasketList: React.FC = () => {

  const dispatch = useAppDispatch()
  const userState = useAppSelector(state => state.user)
  const basketState = useAppSelector(state => state.basket)
  const ordersState = useAppSelector(state => state.orders)
  const productsState = useAppSelector(state => state.products)

  const [productsViewList, setProductsViewList] = useState<TList[]>([])
  const [totalCost, setTotalCost] = useState<number>(0)

  const configureViewList = () => {
    setProductsViewList([])

    basketState.products.forEach(basketProduct => {
      productsState.products?.forEach(product => {
        if(product.id === basketProduct.productId) {
          setProductsViewList(prev => [...prev, {
            id: product.id,
            name: product.name,
            quantity: basketProduct.quantity,
            price: product.price * basketProduct.quantity,
          }])
        }
      })
    })
  }

  // fetch products in basket when basket fetched
  useEffect(() => {
    if(!basketState.basketId) return;
    dispatch(fetchBasketProduct({ basketId: basketState.basketId}))
  }, [basketState.basketId, ordersState])

  // configure basket state after fetching products
  useEffect(() => {
    configureViewList()
  }, [basketState.products])

  // refresh total cost when view list modified
  useEffect(() => {
    setTotalCost(productsViewList.reduce((sum, product) => sum + product.price, 0))
  }, [productsViewList])

  const findIndex = (id: number) => {
    let index = -1
    basketState.products.forEach((product, i) => {
      if(product.productId === id) {
        index = i
      }
    })
    return index
  }

  // increment state
  const increaseQuantity = (productId: number) => {
    if(!basketState.basketId) return;
    const index = findIndex(productId)

    dispatch(increaseBasketProduct({
      productId: productId,
      basketId: basketState.basketId,
      index: index,
    }))
  }

  // decrement state
  const decreaseQuantity = (productId: number) => {
    if(!basketState.basketId) return;
    const index = findIndex(productId)

    dispatch(decreaseBasketProduct({
      productId: productId,
      basketId: basketState.basketId,
      index: index,
    }))
  }

  // confirm order
  const confirmOrder = () => {
    if(!userState.user?.id) return;
    dispatch(createOrder({userId: userState.user?.id, price: totalCost}))
  }

  return (
    <section className={css.BasketListWrapper}>

      {basketState.loading && !productsViewList && <Loader />}

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

      {!basketState.products.length
        ? <h1 style={{margin: 'auto'}}>Корзина пуста</h1>
        : <Button
            onclick={confirmOrder}
            width={'30%'}
            height={30}
            disabled={basketState.loading ? true : false}
            color={'var(--lightgray)'}
          >

          {basketState.loading
            ? <ButtonLoader />
            :
              window.innerWidth > 750
                ? 'Оформить заказ'
                : <EditIcon />
          }
        </Button>
      }
    </section>
  );
}

export default BasketList;