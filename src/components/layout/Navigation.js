import { themeActions } from 'components/store/theme';
import React, { useState } from 'react';
import { TbUserCircle } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserModal from './UserModal';

const Navigation = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);
  const onShowProfile = () => {
    setShowProfile(true);
  };
  const onCloseProfile = () => {
    setShowProfile(false);
  };
  const onToggleDarkMode = () => {
    dispatch(themeActions.toggleDarkMode());
  };
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/commeeting">글쓰기</Link>
          </li>
          <li onClick={onShowProfile}>
            {userInfo.photoURL ? (
              <img
                src={userInfo.photoURL}
                height="30px"
                width="30px"
                alt="profile"
              />
            ) : (
              <TbUserCircle style={{ height: '30px', width: '30px' }} />
            )}
          </li>
          <li onClick={onToggleDarkMode}>다크모드</li>
        </ul>
      </nav>
      {showProfile && <UserModal onCloseProfile={onCloseProfile} />}
    </>
  );
};

export default Navigation;
