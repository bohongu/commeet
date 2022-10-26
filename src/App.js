import { onAuthStateChanged, updateCurrentUser } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from './Firebase';
import { authActions } from './components/store/auth';
import { userActions } from './components/store/user';
import MyRouter from './components/routes/Router';
import LoadingSpinner from 'components/ui/LoadingSpinner';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}
`;

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

  const refreshUser = async () => {
    await updateCurrentUser(auth, auth.currentUser);
    dispatch(userActions.setUserInfo(auth.currentUser));
  };

  return (
    <>
      {/* <GlobalStyle /> */}
      {isLoading ? <MyRouter /> : <LoadingSpinner />}
      <footer>&copy;{new Date().getFullYear()} Commeet</footer>
    </>
  );
};

export default App;
