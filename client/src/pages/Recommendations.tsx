import React from 'react';
import PageHeader from 'components/General/PageHeader';
import RecsInfo from 'components/InfoContainers/RecsInfo';

const Recommendations: React.FC = () => {

  return (
    <div className='Main'>
      <PageHeader>
        Правила Ухода
      </PageHeader>
      <RecsInfo />
    </div>
  );
}

export default Recommendations;