import React, { useState, useEffect} from 'react';
import {useNavigate} from 'react-router';
import {RouteNames} from 'router';

import useInput from 'hooks/useInput';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import {login, registration} from 'store/slices/user/actions';

import Input from 'components/UI/Input';
import Button from 'components/UI/Button';
import css from './index.module.css';

const AuthForm: React.FC = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isUserAuth = useAppSelector(state => state.user.isUserAuth)

  const email = useInput('')
  const password = useInput('')
  const [isRegistration, setIsRegistration] = useState<boolean>(false)

  const [isEmailValidating, setIsEmailValidating] = useState<boolean>(false)
  const [isPasswordValidating, setIsPasswordValidating] = useState<boolean>(false)

  // change form content
  const swapForm = () => setIsRegistration(prev => !prev)

  const submit = () => {
    if (isRegistration) {
      dispatch(registration({email: email.value, password: password.value})) // register user
      setIsRegistration(false) // swap form
      navigate(RouteNames.LOGIN_ROUTE) // redirect to login
    } else {
      // login
      dispatch(login({email: email.value, password: password.value}))
    }
  }

  useEffect(() => {
    email.reset()
    password.reset()
    setIsEmailValidating(false)
    setIsPasswordValidating(false)
  }, [isRegistration])

  useEffect(() => {
    if (!isUserAuth) return;
    navigate(RouteNames.SHOP_ROUTE) // redirect to shop
  }, [isUserAuth])

  // email validation
  const emailClasses = [css.LabelHidden]
  if (email.value && !isEmailValidating) setIsEmailValidating(true)
  if (!email.value && isEmailValidating) emailClasses.push(css.Label)

  // password validation
  const passwordClasses = [css.LabelHidden]
  if (password.value && !isPasswordValidating) setIsPasswordValidating(true)
  if (!password.value && isPasswordValidating) passwordClasses.push(css.Label)

  return (
    <section className={css.AuthWrapper}>
      {isRegistration ? <h1>Регистрация</h1> : <h1>Авторизация</h1>}

      <Input
        value={email.value}
        onChange={email.onChange}
        borderColor={emailClasses.includes(css.Label) ? "#cc4e5c" : ""}
        width={'90%'}
        height={30}
      >
        Адрес электронной почты
      </Input>
      <label className={emailClasses.join(" ")}>Обязательное поле</label>

      <Input
        value={password.value}
        onChange={password.onChange}
        borderColor={passwordClasses.includes(css.Label) ? "#cc4e5c" : ""}
        isPassword={true}
        width={'90%'}
        height={30}
      >
        Пароль
      </Input>
      <label className={passwordClasses.join(" ")}>Обязательное поле</label>

      <div className={css.AuthLinks}>
        <span onClick={swapForm}>
          {isRegistration
            ? 'Уже зарегистрированы? Войдите'
            : 'Нету аккаунта? Зарегистрируйтесь'
          }
        </span>

        <Button
          onclick={submit}
          width={'30%'}
          height={30}
          color='var(--lightgray)'
        >
          Вход
        </Button>
      </div>
    </section>
  );
}

export default AuthForm;