import React, { useEffect, useState } from 'react';
import useAppSelector from 'hooks/useAppSelector';
import { ProductView } from 'store/slices/orders/types';

import OrdersList from 'components/Orders';
import PageHeader from 'components/General/PageHeader';

const Orders: React.FC = () => {
  const basketId = useAppSelector(state => state.basket.basketId)
  const ordersState = useAppSelector(state => state.orders)
  const productsState = useAppSelector(state => state.products)

  const [productsList, setProductsList] = useState<ProductView[]>([])

  const configureList = () => {
    if(!ordersState.products) return;

    for(let orderProduct of  ordersState.products) {
      if(!productsState.products) return;
      for(let product of  productsState.products) {
        if(orderProduct.productId === product.id) {
          setProductsList(prev => [...prev, {
            id: orderProduct.id,
            orderId: orderProduct.orderId,
            name: product.name,
            quantity: orderProduct.quantity,
            price: product.price * orderProduct.quantity,
          }])
        }
      }
    }
  }

  // configure list after user orders update
  useEffect(() => {
    if(!ordersState || !productsState) return;
    configureList()
  }, [ordersState, productsState])

  return (
    <div className='Main'>
      <PageHeader>
        История Заказов
      </PageHeader>
      <OrdersList productsList={productsList} />
    </div>
  );
}

export default Orders;