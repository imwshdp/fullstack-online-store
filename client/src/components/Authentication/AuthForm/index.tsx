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

  const email = useInput('')
  const password = useInput('')
  const [isRegistration, setIsRegistration] = useState<boolean>(false)

  const [isEmailValidating, setIsEmailValidating] = useState<boolean>(false)
  const [isPasswordValidating, setIsPasswordValidating] = useState<boolean>(false)

  // change form content
  const swapForm = () => setIsRegistration(prev => !prev)

  const submit = () => {
    if(isRegistration) {
      // register user
      dispatch(registration({email: email.value, password: password.value, username: 'Затычка для имени'}))
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
  const emailClasses = [css.LabelHidden]
  // on validate
  if(email.value && !isEmailValidating) {
    setIsEmailValidating(true)
  }
  // show label
  if(!email.value && isEmailValidating) {
    emailClasses.push(css.Label)
  }

  const passwordClasses = [css.LabelHidden]
  // on validate
  if(password.value && !isPasswordValidating) {
    setIsPasswordValidating(true)
  }
  // show label
  if(!password.value && isPasswordValidating) {
    passwordClasses.push(css.Label)
  }

  return (
    <div className={css.AuthWrapper}>
      {isRegistration
        ? <h1>Регистрация</h1>
        : <h1>Авторизация</h1>
      }

      <Input
        {...email}
        borderColor={emailClasses.includes(css.Label) ? "#cc4e5c" : ""}
      >
        Адрес электронной почты
      </Input>
      <label className={emailClasses.join(" ")}>
        Обязательное поле
      </label>
      
      <Input
        {...password}
        borderColor={passwordClasses.includes(css.Label) ? "#cc4e5c" : ""}
        isPassword={true}
      >
        Пароль
      </Input>
      <label className={passwordClasses.join(" ")}>
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