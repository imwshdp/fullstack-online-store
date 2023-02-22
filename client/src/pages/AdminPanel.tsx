import * as React from 'react';

import PageHeader from 'components/GeneralComponents/PageHeader';
import QuickAddingSection from 'components/AdminPanelComponents/QuickAddingSection';
import useAppSelector from 'hooks/useAppSelector';
import ProductAddingSection from 'components/AdminPanelComponents/ProductAddingSection';

const AdminPanel = () => {

  const productsState = useAppSelector(state => state.products);
  const categoriesState = useAppSelector(state => state.categories);

  return (
    <section className='Main'>
      <PageHeader>
        Панель Администратора
      </PageHeader>

      <QuickAddingSection
        state={categoriesState}
        header="Добавить / Удалить категорию"
      />

      <ProductAddingSection
        state={productsState}
        header="Добавить товар"
      />
    </section>
  );
}

export default AdminPanel;