import Modal from 'components/ui/Modal';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../Firebase';

const Profile = () => {
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
      <div onClick={onLogout}>로그아웃</div>
    </Modal>
  );
};

export default Profile;
