import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import { auth } from './Firebase';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { authActions } from './store/auth';

const MyRouter = ({ userInfo }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userInfo={userInfo} />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </Router>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(authActions.isLogin());
        setUserInfo(user);
      } else {
        dispatch(authActions.isLogout());
      }
      setIsLoading(true);
    });
  }, [dispatch]);

  return <>{isLoading ? <MyRouter userInfo={userInfo} /> : '로딩'}</>;
};

export default App;
