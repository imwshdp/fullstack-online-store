import * as React from 'react';

import PageHeader from 'components/PageHeader';
import QuickAddingSection from 'components/AdminPanelComponents/QuickAddingSection';

const AdminPanel = () => {
  return (
    <section className='Main'>
      <PageHeader>
        Панель Администратора
      </PageHeader>

      <QuickAddingSection />
    </section>
  );
}

export default AdminPanel;