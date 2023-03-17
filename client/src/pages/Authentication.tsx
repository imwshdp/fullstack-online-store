import React from 'react';
import AuthForm from 'components/Authentication/AuthForm';
import PageHeader from 'components/General/PageHeader';

const Authentication: React.FC = () => {
  return (
    <section className='Main'>
      <PageHeader>Аутентификация</PageHeader>
      <AuthForm />
    </section>
  );
}

export default Authentication;