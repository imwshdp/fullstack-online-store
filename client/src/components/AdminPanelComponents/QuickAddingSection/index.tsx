import * as React from 'react';

import useInput from 'hooks/useInput';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';

import QuickAddingPanel from '../QuickAddingPanel';
import { CategoriesState } from 'store/slices/categories/types';

import css from "./index.module.css";

interface TProps {
  header: string;
  state: CategoriesState;
}

const QuickAddingSection: React.FC<TProps> = ({header, state}) => {

  const categoryName = useInput('');

  return (
    <section className={css.Panel}>
      <h1>{header}</h1>
      <QuickAddingPanel
        inputState={categoryName}
        placeholder={"Введите название категории..."}
        state={state}
      />
    </section>
  );
}

export default QuickAddingSection;