import React from 'react';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { createCategory, deleteCategory } from 'store/slices/categories/actions';

import Input from 'components/UI/Input';
import Button from 'components/UI/Button';
import ButtonLoader from 'components/General/ButtonLoader';
import css from "./index.module.css";

interface TProps {
  placeholder: string;
  inputState: {
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  }
}

const CategoryPanel: React.FC<TProps> = ({inputState, placeholder}) => {

  // store dispatch and selector
  const dispatch = useAppDispatch();
  const categoriesState = useAppSelector(state => state.categories);

  // callbacks for buttons
  const applyCategory = () => dispatch(createCategory({name: inputState.value}));
  const cancelCategory = () => dispatch(deleteCategory({name: inputState.value}));

  return (
    <div className={css.Item}>
      <Input {...inputState} >
        {placeholder}
      </Input>
      
      <Button
        color='var(--applyColor)'
        onclick={applyCategory}
        width={150}
        disabled={categoriesState.loading ? true : false}
      >
        { categoriesState.loading ? <ButtonLoader/> : "Добавить" }
      </Button>

      <Button
        color='var(--cancelColor)'
        onclick={cancelCategory}
        width={150}
        disabled={categoriesState.loading ? true : false}
      >
        { categoriesState.loading ? <ButtonLoader/> : "Удалить" }
      </Button>
    </div>
  );
}

export default CategoryPanel;