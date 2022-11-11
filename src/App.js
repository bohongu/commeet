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
import Footer from 'components/layout/Footer';
import './App.css';

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    height:100vh;
    background: ${(props) => props.theme.bgColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    -ms-overflow-style: none;
    font-family: 'Humanbumsuk';
    color: ${(props) => props.theme.textColor};
    button {
      cursor: pointer;
    }
    }
    
    ::-webkit-scrollbar {
      display: none;
    }
  
  body * {
    box-sizing: border-box;
    width: 100%;
    text-decoration: none;
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
      <Footer />
    </ThemeProvider>
  );
};

export default App;
