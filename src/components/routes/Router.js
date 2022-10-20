import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from '../layout/Navigation';
import Auth from './Auth';
import Commeet from './Commeet';
import Home from './Home';
import Profile from './Profile';

const MyRouter = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/commeeting" element={<Commeet />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </Router>
  );
};

export default MyRouter;
