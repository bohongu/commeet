import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../Firebase';
import Modal from '../ui/Modal';

const UpdateForm = ({ commeet, dbRef, showSetting, setShowUpdateForm }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newCommeet, setNewCommeet] = useState('');
  const onChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'newTitle':
        return setNewTitle(value);
      case 'newCommeet':
        return setNewCommeet(value);
      default:
        return;
    }
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
      </form>
    </Modal>
  );
};

const CommeetList = ({ commeet }) => {
  const [setting, showSetting] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const userInfo = useSelector((state) => state.user.userInfo);
  const dbRef = doc(db, 'commeets', `${commeet.id}`);
  const owner = commeet.authorId === userInfo.uid;
  const onSetting = () => showSetting(true);
  const onCancel = () => showSetting(false);
  const onDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    const ok = confirm('삭제 고고?');
    if (ok) {
      await deleteDoc(dbRef);
    }
    showSetting(false);
  };
  const onUpdate = () => {
    setShowUpdateForm(true);
  };
  return (
    <>
      {showUpdateForm && (
        <UpdateForm
          commeet={commeet}
          dbRef={dbRef}
          showSetting={showSetting}
          setShowUpdateForm={setShowUpdateForm}
        />
      )}
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h3>{commeet.title}</h3>
        <h3>{commeet.commeet}</h3>
        <h3>{commeet.author}</h3>
        <h3>{commeet.createdAt}</h3>
        {owner && <div onClick={onSetting}>환경설정</div>}
        {setting && (
          <>
            <div onClick={onDelete}>삭제</div>
            <div onClick={onUpdate}>수정</div>
            <div onClick={onCancel}>취소</div>
          </>
        )}
      </section>
    </>
  );
};

export default CommeetList;
