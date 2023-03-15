import React, { useEffect} from 'react';

import OrdersList from 'components/Orders';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import PageHeader from 'components/General/PageHeader';
import { fetchOrders } from 'store/slices/orders/actions';

const Orders: React.FC = () => {

  const dispatch = useAppDispatch()
  const userState = useAppSelector(state => state.user)

  useEffect(() => {
    if(!userState.user?.id) return;
    dispatch(fetchOrders({userId: userState.user?.id }))
  }, [])

  return (
    <section className='Main'>
      <PageHeader>
        История Заказов
      </PageHeader>
      <OrdersList />
    </section>
  );
}

export default Orders;