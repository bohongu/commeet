import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import { auth } from './Firebase';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { authActions } from './store/auth';

const MyRouter = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
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
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(authActions.isLogin());
      } else {
        dispatch(authActions.isLogout());
      }
      setIsLoading(true);
    });
  }, [dispatch]);

  return <>{isLoading ? <MyRouter /> : '로딩'}</>;
};

export default App;
