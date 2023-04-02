import React from 'react';
import PageHeader from 'components/General/PageHeader';
import AccountDetails from 'components/Authentication/AccountDetails';

const Account: React.FC = () => {

  return (
    <div className='Main'>
      <PageHeader>Учетная запись</PageHeader>
      <AccountDetails />
    </div>
  );
}

export default Account;