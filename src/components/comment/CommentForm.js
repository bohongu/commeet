import { db } from '../../Firebase';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const CommentForm = ({ commeetId }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [comment, setComment] = useState('');
  const onChange = (event) => {
    setComment(event.target.value);
  };
  const onSubmit = async (event) => {
    const recordDate = new Date().toLocaleString('ko-kr');
    event.preventDefault();
    await addDoc(collection(db, 'comments'), {
      comment,
      commeetId,
      commentCreatedAt: recordDate,
      commentAuthor: userInfo.displayName,
      commentAuthorId: userInfo.uid,
    });
    setComment('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={comment} onChange={onChange} />
      <button>작성</button>
    </form>
  );
};

export default CommentForm;
