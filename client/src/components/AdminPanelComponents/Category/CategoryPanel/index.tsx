import * as React from 'react';

import useAppDispatch from 'hooks/useAppDispatch';
import { createCategory, deleteCategory } from 'store/slices/categories/actions';

import Input from 'components/UI/Input';
import Button from 'components/UI/Button';
import ButtonLoader from 'components/GeneralComponents/ButtonLoader';
import css from "./index.module.css";
import useAppSelector from 'hooks/useAppSelector';

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
  const state = useAppSelector(state => state.categories);

  // callbacks for buttons
  const applyCategory = () => dispatch(createCategory({name: inputState.value}));
  const cancelCategory = () => dispatch(deleteCategory({name: inputState.value}));

  const isLoading = state.loading;

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
        { isLoading ? <ButtonLoader/> : "Добавить" }
      </Button>

      <Button
        color='var(--cancelColor)'
        onclick={cancelCategory}
        width={80}
      >
        { isLoading ? <ButtonLoader/> : "Добавить" }
      </Button>
    </div>
  );
}

export default CategoryPanel;