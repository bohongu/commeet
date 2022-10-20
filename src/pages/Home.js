import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';

const Home = ({ userInfo }) => {
  const [title, setTitle] = useState('');
  const [commeet, setCommeet] = useState('');
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

  const onChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'title':
        return setTitle(value);
      case 'commeet':
        return setCommeet(value);
      default:
        return;
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const today = new Date();
    const date = today.toISOString().split('T')[0];

    await addDoc(collection(db, 'commeets'), {
      title,
      commeet,
      createdAt: date,
      author: userInfo.displayName,
      authorId: userInfo.uid,
    });
    setTitle('');
    setCommeet('');
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">제목</label>
        <input name="title" id="title" value={title} onChange={onChange} />
        <label htmlFor="commeet">본문</label>
        <input
          name="commeet"
          id="commeet"
          value={commeet}
          onChange={onChange}
        />
        <label htmlFor="image">사진</label>
        <input id="image" type="file" />
        <button>업로드</button>
      </form>

      {commeets.map((commeet) => (
        <div key={commeet.id}>
          <h3>{commeet.title}</h3>
          <h4>{commeet.commeet}</h4>
          <h4>{commeet.author}</h4>
          <h5>{commeet.createdAt}</h5>
        </div>
      ))}
    </>
  );
};

export default Home;
