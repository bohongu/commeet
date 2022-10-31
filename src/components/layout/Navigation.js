import React, { useState } from 'react';
import { TbUserCircle } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UserModal from './UserModal';

const Navigation = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [showProfile, setShowProfile] = useState(false);
  const onShowProfile = () => {
    setShowProfile(true);
  };
  const onCloseProfile = () => {
    setShowProfile(false);
  };

  return (
    <NavWrapper>
      <h1>
        <Link to="/">Commeet</Link>
      </h1>
      {userInfo.photoURL ? (
        <NavProfile
          onClick={onShowProfile}
          src={userInfo.photoURL}
          alt="owner-pic"
        />
      ) : (
        <TbUserCircle
          style={{
            borderRadius: '50%',
            height: '60px',
            width: '60px',
            margin: '0 40px',
          }}
          onClick={onShowProfile}
        />
      )}
      {showProfile && <UserModal onCloseProfile={onCloseProfile} />}
    </NavWrapper>
  );
};

export default Navigation;

const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  color: ${(props) => props.theme.textColor};
  background: ${(props) => props.theme.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10%;
  z-index: 10;
  h1 {
    width: 10rem;
    font-size: 2rem;
    color: ${(props) => props.theme.textColor};
  }
`;

const NavProfile = styled.img`
  border-radius: 50%;
  height: 60px;
  width: 60px;
  margin: 0 40px;
`;
