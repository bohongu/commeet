import React from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { uid } = useParams();
  return (
    <div>
      <h1>하이하이</h1>
      <h2>{uid}</h2>
    </div>
  );
};

export default Profile;
