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
      <div>
        <b>Почта</b>
        <span>{user?.email}</span>
      </div>

      <div>
        <b>Имя</b>
        <span>{user?.username}</span>
      </div>
      
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