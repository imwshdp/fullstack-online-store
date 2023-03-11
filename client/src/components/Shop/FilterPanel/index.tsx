import React, { useEffect } from 'react';

import Input from 'components/UI/Input';
import Select from 'components/UI/Select';
import css from "./index.module.css";
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { fetchCategories } from 'store/slices/categories/actions';

const FilterPanel: React.FC = () => {

  const dispatch = useAppDispatch()
  const categoriesState = useAppSelector(state => state.categories)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  const categoriesList: string[] = [];
  if(categoriesState.categories) {
    categoriesState.categories.map(i => categoriesList.push(i.name))
    categoriesList.push("Показать все")
  }

  return (
    <section className={css.FilterPanel}>
        
      <div className={css.MainFilter}>
        <Input>
          Введите название
        </Input>
        <Select>
          {categoriesList}
        </Select>
      </div>

      <div className={css.ViewPanel}>
        <div className={css.ViewButton}></div>
        <div className={css.ViewButton}></div>
      </div>

    </section>
  );
}

export default FilterPanel;