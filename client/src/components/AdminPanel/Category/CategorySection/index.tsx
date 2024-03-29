import React from 'react';

import useInput from 'hooks/useInput';
import CategoryPanel from 'components/AdminPanel/Category/CategoryPanel';
import css from "./index.module.css";

interface TProps {
  header: string;
}

const CategorySection: React.FC<TProps> = ({header}) => {
  const categoryName = useInput('');

  return (
    <section className={css.CategoySection}>
      <h1>{header}</h1>
      <CategoryPanel
        inputState={categoryName}
        placeholder={"Введите название категории..."}
      />
    </section>
  );
}

export default CategorySection;