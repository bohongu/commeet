import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { fireStore } from './Firebase';
import Home from './pages/Home';
import Profile from './pages/Profile';

const App = () => {
  useEffect(() => {
    console.log(fireStore);
  });

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default App;
