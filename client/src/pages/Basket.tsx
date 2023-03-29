import React from 'react';

import BasketList from 'components/Basket/BasketList';
import PageHeader from 'components/General/PageHeader';

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