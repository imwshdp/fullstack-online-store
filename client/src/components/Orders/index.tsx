import React, { useEffect, useState } from 'react';
import useAppSelector from 'hooks/useAppSelector';
import { ProductView } from 'store/slices/orders/types';
import css from './index.module.css';
import Loader from 'components/General/Loader';

interface TProps {
  productsList: ProductView[];
}

const OrdersList: React.FC<TProps> = ({productsList}) => {
  const ordersState = useAppSelector(state => state.orders)

  console.log(productsList)

  return (
    <div className={css.OrdersListWrapper}>
      {ordersState.ordersIds === null
      ?
        <Loader />
      :
        ordersState.ordersIds.map((order, index) =>
          <section
            key={order}
            className={css.Order}
          >
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
          </section>
        )}
    </div>
  );
}

export default OrdersList;