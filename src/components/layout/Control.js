import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../../Firebase';
import { GoPencil } from 'react-icons/go';
import { BiUser } from 'react-icons/bi';
import { MdLogout, MdDarkMode, MdLightMode } from 'react-icons/md';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { signOut } from 'firebase/auth';
import { themeActions } from 'components/store/theme';

const Control = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userInfo = useSelector((state) => state.user.userInfo);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = async () => {
    // eslint-disable-next-line no-restricted-globals
    const ok = confirm('로그아웃 고고?');
    if (ok) {
      await signOut(auth);
      navigate('/');
    }
  };
  const onToggleMenu = () => {
    setShowMenu((prev) => !prev);
  };
  const onToggleDarkMode = () => {
    dispatch(themeActions.toggleDarkMode());
  };
  return (
    <MenuList>
      <Menu onClick={onToggleMenu}>{showMenu ? <FiMinus /> : <FiPlus />}</Menu>
      {showMenu && (
        <>
          <DarkModeMenu onClick={onToggleDarkMode}>
            {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
          </DarkModeMenu>
          <CommeetMenu to="commeeting">
            <GoPencil />
          </CommeetMenu>
          <ProfileMenu to={`profile/${userInfo.uid}`}>
            <BiUser />
          </ProfileMenu>
          <LogoutMenu onClick={onLogout}>
            <MdLogout />
          </LogoutMenu>
        </>
      )}
    </MenuList>
  );
};

export default Control;

const Menus = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  font-size: 1.5rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: ${(props) => props.theme.controlColor};
  margin: 1rem 0;
`;

const MenuList = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  width: 4.5rem;
  position: absolute;
  right: 30rem;
  top: 8rem;
  z-index: 999;
`;

const Menu = styled(Menus)``;
const CommeetMenu = styled(Menus)``;
const DarkModeMenu = styled(Menus)``;
const ProfileMenu = styled(Menus)``;
const LogoutMenu = styled(Menus)``;
