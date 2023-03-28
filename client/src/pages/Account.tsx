import AccountDetails from 'components/Authentication/AccountDetails';
import PageHeader from 'components/General/PageHeader';
import React from 'react';

const Account: React.FC = () => {

  return (
    <div className='Main'>
      <PageHeader>Учетная запись</PageHeader>
      <AccountDetails />
    </div>
  );
}

export default Account;