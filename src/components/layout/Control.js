import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../../Firebase';
import { GoPencil } from 'react-icons/go';
import { BiUser } from 'react-icons/bi';
import { MdLogout } from 'react-icons/md';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { signOut } from 'firebase/auth';

const Control = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userInfo = useSelector((state) => state.user.userInfo);
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
  return (
    <MenuList>
      <Menu onClick={onToggleMenu}>{showMenu ? <FiMinus /> : <FiPlus />}</Menu>
      {showMenu && (
        <>
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
  font-size: 2.5rem;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  background: ${(props) => props.theme.accentColor};
  margin: 1rem 0;
`;

const MenuList = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  width: 4.5rem;
  position: absolute;
  right: 30rem;
  top: 25rem;
`;

const Menu = styled(Menus)``;
const CommeetMenu = styled(Menus)``;
const ProfileMenu = styled(Menus)``;
const LogoutMenu = styled(Menus)``;
