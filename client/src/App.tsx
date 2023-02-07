import React, { useEffect } from 'react';
import useAppDispatch from './hooks/useAppDispatch';
import useAppSelector from './hooks/useAppSelector';
import { setUser } from './store/slices/user';

const App: React.FC = () => {

  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.user);

  console.log(user)

  useEffect(() => {
    dispatch(setUser({
      id: 1,
      email: 'mail',
      password: '111',
      role: 'USER',
    }))
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
