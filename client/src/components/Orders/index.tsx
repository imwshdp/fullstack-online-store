import useAppSelector from 'hooks/useAppSelector';
import React, { useEffect, useState } from 'react';
import { ProductView } from 'store/slices/orders/types';
import css from './index.module.css';

const OrdersList = () => {

  const ordersState = useAppSelector(state => state.orders)
  const productsState = useAppSelector(state => state.products)

  const [productsList, setProductsList] = useState<ProductView[]>([])

  const configureList = () => {
    setProductsList([])

    ordersState.products?.forEach(orderProduct => {
      if(!productsState.products) return;

      productsState.products.forEach(product => {       

        if(orderProduct.productId === product.id) {
          setProductsList(prev => [...prev, {
            id: orderProduct.id,
            orderId: orderProduct.orderId,
            name: product.name,
            quantity: orderProduct.quantity,
            price: product.price * orderProduct.quantity,
          }])
        }
      })
    })

  }

  // configure list after user orders update
  useEffect(() => {
    configureList()
  }, [ordersState])

  return (
    <div className={css.OrdersListWrapper}>
      {ordersState.ordersIds &&  
      ordersState.ordersIds.map((order, index) =>
        <div className={css.Order} key={order}>
          <h1>Заказ № {order}</h1>
            <ul>
              {productsList.map(product =>
                order === product.orderId &&
                <li key={product.id}>
                  <span>{product.name} ({product.quantity} шт.)</span>
                  <br></br>
                  <span>Стоимость: {product.price} &#8381;</span>
                </li>
              )}
            </ul>
            <span>Сумма заказа: {ordersState.prices && ordersState.prices[index]} &#8381;</span>
        </div>
      )}
    </div>
  );
}

export default OrdersList;