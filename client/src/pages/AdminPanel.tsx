import * as React from 'react';

import PageHeader from 'components/General/PageHeader';
import CategorySection from 'components/AdminPanel/Category/CategorySection';
import ProductSection from 'components/AdminPanel/Product/ProductSection';
import CatalogSection from 'components/AdminPanel/Catalog/CatalogSection';

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