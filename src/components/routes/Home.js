import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../Firebase';
import Commeet from '../commeet/Commeet';
import CommeetForm from '../commeet/CommeetForm';

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
      <CommeetForm />
      {commeets.map((commeet) => (
        <Commeet key={commeet.id} commeet={commeet} />
      ))}
    </>
  );
};

export default Home;
