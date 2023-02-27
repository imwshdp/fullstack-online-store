import * as React from 'react';

import PageHeader from 'components/GeneralComponents/PageHeader';
import CategorySection from 'components/AdminPanelComponents/CategorySection';
import useAppSelector from 'hooks/useAppSelector';
import ProductSection from 'components/AdminPanelComponents/ProductSection';

const AdminPanel = () => {

  const productsState = useAppSelector(state => state.products);
  const categoriesState = useAppSelector(state => state.categories);

  return (
    <section className='Main'>
      <PageHeader>
        Панель Администратора
      </PageHeader>

      <CategorySection
        state={categoriesState}
        header="Добавить / Удалить категорию"
      />

      <ProductSection
        state={productsState}
        header="Добавить товар"
      />
    </section>
  );
}

export default AdminPanel;