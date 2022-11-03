import Modal from 'components/ui/Modal';
import { updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PostHeader } from './CommeetForm';

const CommeetUpdate = ({ dbRef, showSetting, setShowUpdateForm }) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    newTitle: '',
    newCommeet: '',
  });
  const { newTitle, newCommeet } = inputs;
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
    await updateDoc(dbRef, {
      title: newTitle,
      commeet: newCommeet,
      updatedAt: date,
      recordUpdatedAt: recordDate,
    });

    setShowUpdateForm(false);
  };
  const onCancel = () => {
    setShowUpdateForm(false);
  };
  const onBack = () => {
    navigate(-1);
  };
  return (
    <Modal>
      <PostHeader>
        <div onClick={onBack}>&larr;</div>
        <h1>EDITING</h1>
        <div></div>
      </PostHeader>
      <UpdateForm onSubmit={onSubmit}>
        <textarea name="newCommeet" value={newCommeet} onChange={onChange} />
        <UpdateButtons>
          <button>수정</button>
          <button onClick={onCancel}>취소</button>
        </UpdateButtons>
      </UpdateForm>
    </Modal>
  );
};

export default CommeetUpdate;

const UpdateForm = styled.form`
  textarea {
    height: 5rem;
    padding-left: 5px;
    font-size: 1.25rem;
    resize: none;
    margin-bottom: 1rem;
  }
`;

const UpdateButtons = styled.div`
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  button {
    width: 100px;
    margin-left: 1rem;
  }
`;
