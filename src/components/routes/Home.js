import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../Firebase';
import CommeetList from '../commeet/CommeetList';

const Home = () => {
  const [commeets, setCommeets] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'commeets'), orderBy('createdAt', 'desc'));
    onSnapshot(q, (querySnapshot) => {
      const updateCommeet = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommeets(updateCommeet);
    });
  }, []);

  return (
    <>
      {commeets.map((commeet) => (
        <CommeetList key={commeet.id} commeet={commeet} />
      ))}
    </>
  );
};

export default Home;
