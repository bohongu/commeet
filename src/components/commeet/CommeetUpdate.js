import Modal from 'components/ui/Modal';
import { updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';

const CommeetUpdate = ({ commeet, dbRef, showSetting, setShowUpdateForm }) => {
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
    await updateDoc(dbRef, {
      title: newTitle,
      commeet: newCommeet,
    });
    showSetting(false);
    setShowUpdateForm(false);
  };
  const onCancel = () => {
    showSetting(false);
    setShowUpdateForm(false);
  };
  return (
    <Modal>
      <form onSubmit={onSubmit}>
        <label htmlFor="newTitle">제목</label>
        <input
          name="newTitle"
          id="newTitle"
          value={newTitle}
          onChange={onChange}
          placeholder={commeet.title}
        />
        <label htmlFor="newCommeet">본문</label>
        <input
          name="newCommeet"
          id="newCommeet"
          value={newCommeet}
          onChange={onChange}
          placeholder={commeet.commeet}
        />
        <button>수정</button>
        <button onClick={onCancel}>취소</button>
      </form>
    </Modal>
  );
};

export default CommeetUpdate;
