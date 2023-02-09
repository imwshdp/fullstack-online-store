import React, { useEffect } from 'react';
import useAppDispatch from './hooks/useAppDispatch';
import useAppSelector from './hooks/useAppSelector';
import { fetchCategories } from './store/slices/products/actions';
import { login, registration } from './store/slices/user/actions';

const App: React.FC = () => {

  const dispatch = useAppDispatch();
  const userState = useAppSelector(state => state.user);
  const prodState = useAppSelector(state => state.products);

  console.log("categories state: ", prodState.categories)

  useEffect(() => {
    dispatch(login({email: 'admin@mail.ru', password: 'qwerty'}))
    dispatch(fetchCategories())
  }, []);

  return (
    <div>
      {userState.loading
      ? "загрузка..."
      : ""
      }
      {userState.user
      ? "пользователь есть"
      : "пользователя нету"
      }
    </div>
  );
}

export default App;