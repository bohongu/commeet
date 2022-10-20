import { addDoc, collection } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom/dist';
import { db } from '../../Firebase';

const CommeetForm = () => {
  const [inputs, setInputs] = useState({
    title: '',
    commeet: '',
  });
  const { title, commeet } = inputs;
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  const onChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const today = new Date();
    const date = today.toISOString().split('T')[0];
    const recordDate = today.toLocaleString('ko-kr');

    await addDoc(collection(db, 'commeets'), {
      title,
      commeet,
      createdAt: date,
      updatedAt: null,
      recordUpdatedAt: null,
      recordCreatedAt: recordDate,
      author: userInfo.displayName,
      authorId: userInfo.uid,
    });
    setInputs({
      title: '',
      commeet: '',
    });
    navigate('/', { replace: true });
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
