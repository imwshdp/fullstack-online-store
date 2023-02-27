import * as React from 'react';

import useInput from 'hooks/useInput';
import { CategoriesState } from 'store/slices/categories/types';

import CategoryPanel from 'components/AdminPanelComponents/Category/CategoryPanel';
import css from "./index.module.css";

interface TProps {
  header: string;
}

const CategorySection: React.FC<TProps> = ({header}) => {

  const categoryName = useInput('');

  return (
    <section className={css.Section}>
      <h1>{header}</h1>
      <CategoryPanel
        inputState={categoryName}
        placeholder={"Введите название категории..."}
      />
    </section>
  );
}

export default CategorySection;