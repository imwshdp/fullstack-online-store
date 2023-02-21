import * as React from 'react';

import useInput from 'hooks/useInput';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';

import QuickAddingPanel from '../QuickAddingPanel';

import css from "./index.module.css";

const QuickAddingSection: React.FC = () => {

  const dispatch = useAppDispatch();
  const categoriesState = useAppSelector(state => state.categories);

  const categoryName = useInput('');

  return (
    <section className={css.Panel}>
      <QuickAddingPanel
        inputState={categoryName}
        placeholder={"Введите название категории..."}
      />
    </section>
  );
}

export default QuickAddingSection;