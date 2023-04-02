import React from 'react';
import PageHeader from 'components/General/PageHeader';
import SizesList from 'components/InfoContainers/SizesInfo';

const Sizes: React.FC = () => {

  return (
    <div className='Main'>
      <PageHeader>
        Как Подобрать Размер
      </PageHeader>
      <SizesList />
    </div>
  );
}

export default Sizes;