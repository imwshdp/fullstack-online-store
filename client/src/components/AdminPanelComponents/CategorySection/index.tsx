import * as React from 'react';

import useInput from 'hooks/useInput';
import { CategoriesState } from 'store/slices/categories/types';

import CategoryPanel from '../CategoryPanel';
import css from "./index.module.css";

interface TProps {
  header: string;
  state: CategoriesState;
}

const CategorySection: React.FC<TProps> = ({header, state}) => {

  const categoryName = useInput('');

  return (
    <section className={css.Section}>
      <h1>{header}</h1>
      <CategoryPanel
        inputState={categoryName}
        placeholder={"Введите название категории..."}
        state={state}
      />
    </section>
  );
}

export default CategorySection;