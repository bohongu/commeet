import React from 'react';
import { useParams } from 'react-router-dom';

const Commeet = () => {
  const { id } = useParams();
  return <div>새 라우터 {id}</div>;
};

export default Commeet;
