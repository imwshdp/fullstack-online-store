import React from 'react';

import PageHeader from 'components/General/PageHeader';
import BasketList from 'components/Basket/BasketList';

const Basket: React.FC = () => {
  return (
    <div className='Main'>
      <PageHeader>
        Корзина
      </PageHeader>
      <BasketList />
    </div>
  );
}

export default Basket;