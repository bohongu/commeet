import Modal from 'components/ui/Modal';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../../Firebase';

const UserModal = ({ onCloseProfile }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const onLogout = async () => {
    // eslint-disable-next-line no-restricted-globals
    const ok = confirm('로그아웃 고고?');
    if (ok) {
      await signOut(auth);
      navigate('/', { replace: true });
    }
  };
  return (
    <Modal menu>
      <StyledLink to="commeeting" onClick={onCloseProfile}>
        COMMEETING
      </StyledLink>
      <StyledLink to={`profile/${userInfo.uid}`} onClick={onCloseProfile}>
        PROFILE
      </StyledLink>
      <StyledLink onClick={onLogout}>LOG OUT</StyledLink>
    </Modal>
  );
};

export default UserModal;

const StyledLink = styled(Link)`
  font-size: 1.125rem;
  margin: 0.7rem 0;
  display: flex;
  justify-content: end;
  text-decoration: underline;
  text-underline-offset: 5px;
`;
