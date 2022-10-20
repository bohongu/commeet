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
    <section>
      <h3>Profile</h3>
      <h3>프로필 수정하는 거랑 내 글 목록 등등</h3>
      <div onClick={onLogout}>로그아웃</div>
    </section>
  );
};

export default Profile;
