import Control from 'components/layout/Control';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from '../layout/Navigation';
import Auth from './Auth';
import Commeeting from './Commeeting';
import Home from './Home';
import NotFound from './NotFound';
import Profile from './Profile';

const MyRouter = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      {isLoggedIn && (
        <>
          <Navigation />
          <Control />
        </>
      )}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile">
              <Route path=":uid" element={<Profile />} />
            </Route>
            <Route path="/commeeting" element={<Commeeting />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default MyRouter;
