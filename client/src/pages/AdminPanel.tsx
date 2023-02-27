import * as React from 'react';

import PageHeader from 'components/GeneralComponents/PageHeader';
import CategorySection from 'components/AdminPanelComponents/Category/CategorySection';
import ProductSection from 'components/AdminPanelComponents/Product/ProductSection';
import CatalogSection from 'components/AdminPanelComponents/Catalog/CatalogSection';

const AdminPanel: React.FC = () => {

  return (
    <section className='Main'>
      <PageHeader>Панель Администратора</PageHeader>
      <CategorySection header="Добавить / Удалить категорию" />
      <ProductSection header="Добавить товар" />
      <CatalogSection header="Редактирование каталога" />
    </section>
  );
}

export default AdminPanel;