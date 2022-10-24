import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom/dist';
import { db, storage } from '../../Firebase';

const CommeetForm = () => {
  const [inputs, setInputs] = useState({
    title: '',
    commeet: '',
  });
  const [fileList, setFileList] = useState([]);
  const { title, commeet } = inputs;
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onImageChange = (event) => {
    const fileArr = event.target.files;
    let fileURLs = [];
    let file;
    let filesLength = fileArr.length > 10 ? 10 : fileArr.length;

    for (let i = 0; i < filesLength; i++) {
      file = fileArr[i];

      let reader = new FileReader();
      reader.onloadend = () => {
        fileURLs[i] = reader.result;
        setFileList((prev) => [...prev, fileURLs]);
      };
      reader.readAsDataURL(file);
    }
  };

  const onFileClear = () => {};

  const onSubmit = async (event, fileList) => {
    event.preventDefault();
    const date = new Date().toISOString().split('T')[0];
    const recordDate = new Date().toLocaleString('ko-kr');
    const urls = await Promise.all(
      fileList.map((file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        uploadBytesResumable(storageRef, file);
        return getDownloadURL(storageRef);
      }),
    );
    await addDoc(collection(db, 'commeets'), {
      title,
      commeet,
      createdAt: date,
      updatedAt: null,
      recordUpdatedAt: null,
      recordCreatedAt: recordDate,
      author: userInfo.displayName,
      authorId: userInfo.uid,
      uploadedFile: urls,
    });
    setInputs({
      title: '',
      commeet: '',
    });

    navigate('/', { replace: true });
  };

  return (
    <form onSubmit={(event) => onSubmit(event, fileList)}>
      <label htmlFor="title">제목</label>
      <input name="title" id="title" value={title} onChange={onInputChange} />
      <label htmlFor="commeet">본문</label>
      <input
        name="commeet"
        id="commeet"
        value={commeet}
        onChange={onInputChange}
      />
      <label htmlFor="image">사진</label>
      <input
        id="image"
        type="file"
        multiple
        accept="image/*"
        onChange={onImageChange}
      />
      {fileList &&
        fileList.map((file, id) => (
          <div key={id}>
            <img
              src={file}
              width="100px"
              height="100px"
              alt={`${file}-${id}`}
            />
            <button onClick={onFileClear}>❌</button>
          </div>
        ))}
      <button>업로드</button>
    </form>
  );
};

export default CommeetForm;
