import * as React from 'react';
import { Route, Routes } from 'react-router';

import useAppSelector from 'hooks/useAppSelector';
import { privateRoutes, publicRoutes } from 'router';

const AppRouter: React.FC = () => {

  const isUserAuth = useAppSelector(state => state.user.isUserAuth);
  
  return (
    <Routes>
      {isUserAuth
      ?
        privateRoutes.map(route =>
        <Route
          key={route.path}
          path={route.path}
          element={<route.element/>}
        />
        )
      :
        publicRoutes.map(route =>
          <Route
            key={route.path}
            path={route.path}
            element={<route.element/>}
          />
        )
    }
    </Routes>
  );
}

export default AppRouter;