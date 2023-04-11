import React from 'react';

import PageHeader from 'components/General/PageHeader';
import ProductSection from 'components/AdminPanel/Product/ProductSection';
import CatalogSection from 'components/AdminPanel/Catalog/CatalogSection';
import CategorySection from 'components/AdminPanel/Category/CategorySection';

const AdminPanel: React.FC = () => {

  return (
    <div className='Main'>
      <PageHeader>Панель Администратора</PageHeader>
      <CategorySection header="Добавить / Удалить категорию" />
      <ProductSection header="Добавить товар" />
      <CatalogSection header="Редактирование каталога" />
    </div>
  );
}

export default AdminPanel;