import React, { useEffect } from 'react';
import useAppDispatch from './hooks/useAppDispatch';
import useAppSelector from './hooks/useAppSelector';
import { login, registration } from './store/slices/user/actions';

const App: React.FC = () => {

  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.user);

  console.log(user)

  useEffect(() => {
    dispatch(login({email: 'admin@mail.ru', password: 'qwerty'}))
  }, []);

  return (
    <div>
      {user
      ? "пользователь есть"
      : "пользователя нету"
      }
    </div>
  );
}

export default App;