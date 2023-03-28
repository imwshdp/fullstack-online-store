import React from 'react';
import AuthForm from 'components/Authentication/AuthForm';
import PageHeader from 'components/General/PageHeader';

const Authentication: React.FC = () => {
  return (
    <div className='Main'>
      <PageHeader>Аутентификация</PageHeader>
      <AuthForm />
    </div>
  );
}

export default Authentication;