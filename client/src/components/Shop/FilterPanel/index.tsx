import React, { useEffect } from 'react';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { setActiveCategory } from 'store/slices/categories';
import { fetchCategories } from 'store/slices/categories/actions';

import Input from 'components/UI/Input';
import Select from 'components/UI/Select';
import css from "./index.module.css";

interface TProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const FilterPanel: React.FC<TProps> = ({value, onChange}) => {

  const dispatch = useAppDispatch()
  const categoriesState = useAppSelector(state => state.categories)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  const categoriesList: string[] = [];
  if(categoriesState.categories) {
    categoriesList.push("Показать все")
    categoriesState.categories.map(i => categoriesList.push(i.name))
  }

  const setNewActiveCategory = (e: any) => {
    let newActive
    categoriesState.categories?.forEach(category => {
      if(category.name == e.target.value) {
        newActive = category
      }
    })

    newActive
      ? dispatch(setActiveCategory(newActive))
      : dispatch(setActiveCategory(null))
  }

  return (
    <section className={css.FilterPanel}>
        
      <div className={css.MainFilter}>
        <Input
          value={value}
          onChange={onChange}
        >
          Введите название
        </Input>
        <Select onchange={setNewActiveCategory} >
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