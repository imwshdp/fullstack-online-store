import React from 'react';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { logout } from 'store/slices/user';

import Button from 'components/UI/Button';
import css from './index.module.css';

const AccountDetails: React.FC = () => {
  
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user.user)

  const logOut = () => {
    dispatch(logout({}))
  }

  return (
    <div className={css.AccountInfo}>
      <p>
        <span>Почта</span>
        <div>{user?.email}</div>
      </p>

      <p>
        <span>Имя</span>
        <div>{user?.username}</div>
      </p>
      
      <Button
        onclick={logOut}
        width={'50%'}
      >
        Выйти из аккаунта
      </Button>
    </div>
  );
}

export default AccountDetails;