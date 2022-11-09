import { db } from '../../Firebase';
import { addDoc, collection } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { BsPencilSquare } from 'react-icons/bs';

const CommentForm = ({ commeetId }) => {
  const focusRef = useRef();
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
      commentAuthorAvatar: userInfo.photoURL,
      commentAuthor: userInfo.displayName,
      commentAuthorId: userInfo.uid,
    });
    setComment('');
    focusRef.current.focus();
  };

  return (
    <CommentFormWrapper onSubmit={onSubmit}>
      <input
        type="text"
        value={comment}
        onChange={onChange}
        ref={focusRef}
        placeholder="
Write a comment"
      />
      <button>
        <BsPencilSquare />
      </button>
    </CommentFormWrapper>
  );
};

export default CommentForm;

const CommentFormWrapper = styled.form`
  display: flex;
  justify-content: space-between;
  width: 40rem;
  height: 2.25rem;
  margin: 8px 0;
  margin-top: 13px;
  input {
    font-size: 14px;
    padding-left: 5px;
    width: 37rem;
    border: 1px solid ${(props) => props.theme.borderColor};
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    background: none;
    border: 1px solid ${(props) => props.theme.accentColor};
    color: ${(props) => props.theme.accentColor};
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
  }
`;
