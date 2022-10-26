import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './Firebase';
import { authActions } from './components/store/auth';
import { userActions } from './components/store/user';
import MyRouter from './components/routes/Router';
import LoadingSpinner from 'components/ui/LoadingSpinner';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import { darkTheme, lightTheme } from 'theme';

const GlobalStyle = createGlobalStyle`
    ${reset}
    body {
      background-color: ${(props) => props.theme.bgColor};
      color:${(props) => props.theme.textColor}
    }
`;

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
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
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      {isLoading ? <MyRouter /> : <LoadingSpinner />}
      <footer>&copy;{new Date().getFullYear()} Commeet</footer>
    </ThemeProvider>
  );
};

export default App;
