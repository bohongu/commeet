import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserModal from './UserModal';

const Navigation = () => {
  const [showProfile, setShowProfile] = useState(false);
  const onShowProfile = () => {
    setShowProfile(true);
  };
  const onCloseProfile = () => {
    setShowProfile(false);
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
          <li onClick={onShowProfile}>프로필</li>
        </ul>
      </nav>
      {showProfile && <UserModal onCloseProfile={onCloseProfile} />}
    </>
  );
};

export default Navigation;
