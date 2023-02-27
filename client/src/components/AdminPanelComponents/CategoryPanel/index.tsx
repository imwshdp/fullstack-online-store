import * as React from 'react';

import useAppDispatch from 'hooks/useAppDispatch';
import { CategoriesState } from 'store/slices/categories/types';
import { createCategory, deleteCategory } from 'store/slices/categories/actions';

import Input from 'components/UI/Input';
import Button from 'components/UI/Button';
import ButtonLoader from 'components/GeneralComponents/ButtonLoader';
import css from "./index.module.css";

interface TProps {
  placeholder: string;
  state: CategoriesState;
  inputState: {
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  }
}

const CategoryPanel: React.FC<TProps> = ({inputState, placeholder, state}) => {

  const dispatch = useAppDispatch();

  // callbacks for buttons
  const applyCategory = () => dispatch(createCategory({name: inputState.value}));
  const cancelCategory = () => dispatch(deleteCategory({name: inputState.value}));

  const isLoading = state.loading;
  // const error = state.error;

  return (
    <div className={css.Item}>
      <Input {...inputState} >
        {placeholder}
      </Input>
      
      <Button
        color='var(--applyColor)'
        onclick={applyCategory}
        width={80}
      >
        { isLoading
          ? <ButtonLoader/>
          : "Добавить"
        }
      </Button>

      <Button
        color='var(--cancelColor)'
        onclick={cancelCategory}
        width={80}
      >
        { isLoading
          ? <ButtonLoader/>
          : "Удалить"
        }
      </Button>
    </div>
  );
}

export default CategoryPanel;