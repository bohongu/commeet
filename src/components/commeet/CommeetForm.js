import { addDoc, collection } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../Firebase';

const CommeetForm = () => {
  const [title, setTitle] = useState('');
  const [commeet, setCommeet] = useState('');
  const userInfo = useSelector((state) => state.user.userInfo);

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
    <form onSubmit={onSubmit}>
      <label htmlFor="title">제목</label>
      <input name="title" id="title" value={title} onChange={onChange} />
      <label htmlFor="commeet">본문</label>
      <input name="commeet" id="commeet" value={commeet} onChange={onChange} />
      <label htmlFor="image">사진</label>
      <input id="image" type="file" />
      <button>업로드</button>
    </form>
  );
};

export default CommeetForm;
