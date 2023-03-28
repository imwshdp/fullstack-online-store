import React from 'react';

import OrdersList from 'components/Orders';
import PageHeader from 'components/General/PageHeader';

const Orders: React.FC = () => {
  return (
    <div className='Main'>
      <PageHeader>
        История Заказов
      </PageHeader>
      <OrdersList />
    </div>
  );
}

export default Orders;