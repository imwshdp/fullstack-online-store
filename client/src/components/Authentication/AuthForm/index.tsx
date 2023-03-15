import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { RouteNames } from 'router';

import useInput from 'hooks/useInput';
import useAppDispatch from 'hooks/useAppDispatch';
import { login, registration } from 'store/slices/user/actions';

import Input from 'components/UI/Input';
import Button from 'components/UI/Button';
import css from './index.module.css';

const AuthForm: React.FC = () => {

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const [isRegistration, setIsRegistration] = useState<boolean>(false)

  const email = useInput('')
  const password = useInput('')

  // change form content
  const swapForm = () => setIsRegistration(prev => !prev)

  const submit = () => {
    if(isRegistration) {
      // register user
      dispatch(registration({email: email.value, password: password.value}))
      // swap form
      setIsRegistration(false)
      // redirect to login
      navigate(RouteNames.LOGIN_ROUTE)
    } else {
      // login
      dispatch(login({email: email.value, password: password.value}))      
      // redirect to shop
      navigate(RouteNames.SHOP_ROUTE)
    }
  }

  // css classes adding
  const emailClasses = [css.Label]
  if(!email.value) {
    emailClasses.push(css.LabelHidden)
  }

  const passwordClasses = [css.Label]
  if(!password.value) {
    passwordClasses.push(css.LabelHidden)
  }

  return (
    <div className={css.AuthWrapper}>
      {isRegistration
        ? <h1>Регистрация</h1>
        : <h1>Авторизация</h1>
      }

      <Input {...email} >Адрес электронной почты</Input>
      <label
        className={emailClasses.join(" ")}
      >
        Обязательное поле
      </label>
      
      <Input {...password} >Пароль</Input>
      <label
        className={passwordClasses.join(" ")}
      >
        Обязательное поле
      </label>

      <div className={css.AuthLinks}>
        <span
          onClick={swapForm}
        >
          {isRegistration
          ? 'Уже зарегистрированы? Войдите'
          : 'Нету аккаунта? Зарегистрируйтесь'
          }
        </span>

        <Button onclick={submit} >
          Вход
        </Button>
      </div>
    </div>
  );
}

export default AuthForm;