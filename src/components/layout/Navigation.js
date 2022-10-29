import { themeActions } from 'components/store/theme';
import React, { useState } from 'react';
import { TbUserCircle } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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
      <NavWrapper>
        <div>
          <Link to="/">홈</Link>
        </div>
        <Nav>
          <div>
            <Link to="/commeeting">글</Link>
          </div>
          <div onClick={onShowProfile}>
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
          </div>
          <div onClick={onToggleDarkMode}>다크</div>
        </Nav>
      </NavWrapper>
      {showProfile && <UserModal onCloseProfile={onCloseProfile} />}
    </>
  );
};

export default Navigation;

const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 15%;
`;

const Nav = styled.div`
  display: flex;
  justify-content: flex-end;

  div {
    height: 45px;
    width: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 1.25%;
  }
`;
