import React from 'react';
import { useState } from 'react';

const CommeetList = ({ commeet }) => {
  const [setting, showSetting] = useState(false);
  const onSetting = () => showSetting(true);
  const onCancel = () => showSetting(false);
  return (
    <div>
      <h3>{commeet.title}</h3>
      <h4>{commeet.commeet}</h4>
      <h4>{commeet.author}</h4>
      <h5>{commeet.createdAt}</h5>
      <div onClick={onSetting}>환경설정</div>
      {setting && (
        <>
          <div>삭제</div>
          <div>수정</div>
          <div onClick={onCancel}>취소</div>
        </>
      )}
    </div>
  );
};

export default CommeetList;
