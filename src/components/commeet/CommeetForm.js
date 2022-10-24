import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom/dist';
import { db, storage } from '../../Firebase';
import { v4 } from 'uuid';

const CommeetForm = () => {
  const [inputs, setInputs] = useState({
    title: '',
    commeet: '',
  });
  const [file, setFile] = useState('');
  const { title, commeet } = inputs;
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  const onInputChnage = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onImageChange = (event) => {
    const { files } = event.target;
    const image = files[0];
    const reader = new FileReader();
    reader.onloadend = (event) => {
      setFile(event.currentTarget.result);
    };
    reader.readAsDataURL(image);
  };

  const onFileClear = () => {
    setFile('');
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let fileUrl = '';
    const date = new Date().toISOString().split('T')[0];
    const recordDate = new Date().toLocaleString('ko-kr');
    if (file !== '') {
      const storageRef = ref(storage, `${userInfo.uid}/${v4()}`);
      await uploadString(storageRef, file, 'data_url');
      fileUrl = await getDownloadURL(ref(storage, storageRef));
    }
    await addDoc(collection(db, 'commeets'), {
      title,
      commeet,
      createdAt: date,
      updatedAt: null,
      recordUpdatedAt: null,
      recordCreatedAt: recordDate,
      author: userInfo.displayName,
      authorId: userInfo.uid,
      fileUrl,
    });
    setInputs({
      title: '',
      commeet: '',
    });
    setFile('');
    navigate('/', { replace: true });
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="title">제목</label>
      <input name="title" id="title" value={title} onChange={onInputChnage} />
      <label htmlFor="commeet">본문</label>
      <input
        name="commeet"
        id="commeet"
        value={commeet}
        onChange={onInputChnage}
      />
      <label htmlFor="image">사진</label>
      <input id="image" type="file" accept="image/*" onChange={onImageChange} />
      {file && (
        <>
          <img src={file} width="100px" height="100px" alt="commeet-pic" />
          <button onClick={onFileClear}>❌</button>
        </>
      )}
      <button>업로드</button>
    </form>
  );
};

export default CommeetForm;
