import Modal from 'components/ui/Modal';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
    <Modal>
      <Link to={`profile/${userInfo.uid}`} onClick={onCloseProfile}>
        개인정보 설정
      </Link>
      <div>
        <Link to="commeeting" onClick={onCloseProfile}>
          글쓰기
        </Link>
      </div>
      <div onClick={onLogout}>로그아웃</div>
    </Modal>
  );
};

export default UserModal;
