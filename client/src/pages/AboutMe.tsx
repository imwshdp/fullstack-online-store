import React from 'react';
import PageHeader from 'components/General/PageHeader';
import AboutMeInfo from 'components/InfoContainers/AboutMeInfo';

const AboutMe: React.FC = () => {

  return (
    <div className='Main'>
      <PageHeader>
        Обо Мне
      </PageHeader>
      <AboutMeInfo />
    </div>
  );
}

export default AboutMe;