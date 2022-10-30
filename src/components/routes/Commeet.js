import Main from 'components/layout/Main';
import { db } from '../../Firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Commeet = () => {
  const [details, setDetails] = useState([]);
  const commeets = useSelector((state) => state.commeet.commeets);
  const { id } = useParams();

  useEffect(() => {
    for (let i = 0; i < commeets.length; i++) {
      const q = query(
        collection(db, 'commeets'),
        where(commeets[i].id, '==', id),
      );
      onSnapshot(q, (querySnapshot) => {
        const updateCommeet = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDetails(updateCommeet);
      });
    }
  }, [commeets, id]);
  return (
    <Main>
      아아
      {details.map((item) => (
        <div>{item}</div>
      ))}
      <div>새 라우터 {id}</div>
    </Main>
  );
};

export default Commeet;
