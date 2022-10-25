import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { uid } = useParams();
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log(userInfo);
  return (
    <div>
      <h1>하이하이</h1>
      <h2>{userInfo.displayName}</h2>
      <img src={userInfo.photoURL} width="50px" height="50px" />
    </div>
  );
};

export default Profile;
