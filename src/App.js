import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './Firebase';
import { authActions } from './components/store/auth';
import { userActions } from './components/store/user';
import MyRouter from './components/routes/Router';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(authActions.setLogin());
        dispatch(userActions.setUserInfo(user));
      } else {
        dispatch(authActions.setLogout());
      }
      setIsLoading(true);
    });
  }, [dispatch]);

  return (
    <>
      {isLoading ? <MyRouter /> : '로딩'}
      <footer>&copy;{new Date().getFullYear()} Commeet</footer>
    </>
  );
};

export default App;
