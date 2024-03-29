import React from 'react';

import useInput from 'hooks/useInput';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { logout } from 'store/slices/user';
import { User } from 'store/slices/user/types';
import { changeEmail, changePassword, changeUsername, removeUser } from 'store/slices/user/actions';

import Input from 'components/UI/Input';
import Button from 'components/UI/Button';
import EditIcon from 'resources/icons/EditIcon';
import LogoutIcon from 'resources/icons/LogoutIcon';
import DeleteUserIcon from 'resources/icons/DeleteUserIcon';
import css from './index.module.css';

const AccountDetails: React.FC = () => {
  
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user.user) as User

  const emailInput = useInput(user.email);
  const usernameInput = useInput(user.username);
  const passwordInput = useInput('');
  const oldPasswordInput = useInput('');

  const logOut = () => {
    if(window.confirm("Вы действительно хотите выйти из учетной записи?")) {
      dispatch(logout({}))
    }
  }

  const updateEmail = () => {
    if(window.confirm("Подтвердите изменение адреса электронной почты")) {
      dispatch(changeEmail({
        id: user.id,
        email: emailInput.value,
      }))
    }
  }

  const updatePassword = () => {
    if(window.confirm("Подтвердите изменение пароля учетной записи")) {
      dispatch(changePassword({
        id: user.id,
        password: passwordInput.value,
        oldPassword: oldPasswordInput.value,
      }))
    }
  }

  const updateUsername = () => {
    if(window.confirm("Подтвердите изменение имени учетной записи")) {
      dispatch(changeUsername({
        id: user.id,
        username: usernameInput.value,
      }))
    }
  }

  const deleteAccout = () => {
    const answer = window.prompt("Для подтверждения удаления учетной записи введите слово ПОДТВЕРЖДАЮ большими буквами ниже.")
    if(answer !== 'ПОДТВЕРЖДАЮ') return;
    dispatch(removeUser({ id: user.id }))
  }

  // validation
  let validation = false
  if(passwordInput.value !== "" && oldPasswordInput.value === "") {
    validation = true
  }

  return (
    <section className={css.AccountInfo}>
      <div>
        <b>Почта</b>
        <Input
          value={emailInput.value}
          onChange={emailInput.onChange}
        />
        <Button
          onclick={updateEmail}
          color='var(--applyColor)'
        >
          <EditIcon />
        </Button>
      </div>

      <div>
        <b>Имя</b>
        <Input
          value={usernameInput.value}
          onChange={usernameInput.onChange}
        />
        <Button
          onclick={updateUsername}
          color='var(--applyColor)'
        >
          <EditIcon />
        </Button>
      </div>

      <div>
        <b>Текущий Пароль</b>
        <Input
          value={oldPasswordInput.value}
          onChange={oldPasswordInput.onChange}
          borderColor={validation ? "#cc4e5c" : ""}
          isPassword={true}
        >
          Обязательное поле при смене пароля
        </Input>
      </div>

      <div>
        <b>Новый Пароль</b>
        <Input
          value={passwordInput.value}
          onChange={passwordInput.onChange}
          borderColor={validation ? "#cc4e5c" : ""}
          isPassword={true}
        />
        <Button
          onclick={updatePassword}
          color='var(--applyColor)'
          disabled={validation || !passwordInput.value ? true : false}
        >
          <EditIcon />
        </Button>
      </div>
      
      <div className={css.userChangingButtons}>
        <Button
          onclick={deleteAccout}
          width={'50%'}
          color='var(--cancelColor)'
        >
          {window.innerWidth > 750
            ? 'Удалить аккаунт'
            : <DeleteUserIcon />
          }
        </Button>

        <Button
          onclick={logOut}
          width={'50%'}
          color='var(--lightgray)'
        >
          {window.innerWidth > 750
            ? 'Выйти из аккаунта'
            : <LogoutIcon />
          }
        </Button>
      </div>

    </section>
  );
}

export default AccountDetails;