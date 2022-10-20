import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../Firebase';

const Profile = () => {
  const navigate = useNavigate();
  const onLogout = async () => {
    await signOut(auth);
    navigate('/', { replace: true });
  };
  return (
    <>
      <div>Profile</div>
      <div onClick={onLogout}>로그아웃</div>
    </>
  );
};

export default Profile;
