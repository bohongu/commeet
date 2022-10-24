import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { db, storage } from '../../Firebase';
import CommeetUpdate from './CommeetUpdate';

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
      await deleteObject(ref(storage, commeet.fileUrl));
    }
    showSetting(false);
  };
  const onUpdate = () => {
    setShowUpdateForm(true);
  };
  return (
    <>
      {showUpdateForm && (
        <CommeetUpdate
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
        <img
          src={commeet.fileUrl}
          alt="commeet-pic"
          width="100px"
          height="100px"
        />
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
