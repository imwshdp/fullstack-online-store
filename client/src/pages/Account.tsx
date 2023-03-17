import AccountDetails from 'components/Authentication/AccountDetails';
import PageHeader from 'components/General/PageHeader';
import React from 'react';

const Account: React.FC = () => {

  return (
    <section className='Main'>
      <PageHeader>Учетная запись</PageHeader>
      <AccountDetails />
    </section>
  );
}

export default Account;