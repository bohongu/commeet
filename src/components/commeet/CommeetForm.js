import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom/dist';
import { db, storage } from '../../Firebase';
import { v4 } from 'uuid';
import { BsImage } from 'react-icons/bs';
import { MdOutlineCancel } from 'react-icons/md';
import styled from 'styled-components';
import Modal from 'components/ui/Modal';
import { TbUserCircle } from 'react-icons/tb';

const CommeetForm = () => {
  const [commeet, setCommeet] = useState('');
  const [file, setFile] = useState('');
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  const onInputChange = (event) => {
    const { value } = event.target;
    setCommeet(value);
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
      commeet,
      createdAt: date,
      updatedAt: null,
      recordUpdatedAt: null,
      recordCreatedAt: recordDate,
      author: userInfo.displayName,
      authorId: userInfo.uid,
      fileUrl,
      authorImage: userInfo.photoURL,
    });
    setCommeet('');
    setFile('');
    navigate('/', { replace: true });
  };
  const onBack = () => {
    navigate(-1);
  };

  return (
    <Modal>
      <PostHeader>
        <div onClick={onBack}>&larr;</div>
        <h1>NEW COMMEET</h1>
        <div></div>
      </PostHeader>
      <PostForm onSubmit={onSubmit}>
        <PostInputs>
          <PostAuthorImageArea>
            {userInfo.photoURL ? (
              <PostAutherImage src={userInfo.photoURL} />
            ) : (
              <TbUserCircle
                style={{
                  borderRadius: '50%',
                  height: '46px',
                  width: '46px',
                }}
              />
            )}
          </PostAuthorImageArea>
          <PostInput>
            <PostAutherName>{userInfo.displayName}</PostAutherName>
            <PostTextArea onChange={onInputChange}></PostTextArea>
          </PostInput>
          <PostButtons>
            <PostButton>COMMEET</PostButton>
          </PostButtons>
        </PostInputs>
        <Preview>
          {file ? (
            <>
              <DeleteButton onClick={onFileClear}>
                <MdOutlineCancel />
              </DeleteButton>
              <PreviewImage src={file} />
            </>
          ) : (
            <PushImage>
              <label htmlFor="commeet-image">
                <BsImage />
                <div>Attaching a photo is required</div>
              </label>
              <input
                type="file"
                id="commeet-image"
                onChange={onImageChange}
                required
              />
            </PushImage>
          )}
        </Preview>
      </PostForm>
    </Modal>
  );
};

export default CommeetForm;

export const PostHeader = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  padding: 0.5rem;
  padding-top: 0;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  div:first-child {
    cursor: pointer;
  }
  h1 {
    display: flex;
    justify-content: center;
  }
`;

const PostForm = styled.form``;

const PostInputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 8fr;
  grid-template-areas: 'image content' 'image buttons';
`;

const PostAuthorImageArea = styled.div`
  grid-area: image;
`;

const PostAutherImage = styled.img`
  height: 46px;
  width: 46px;
  border-radius: 50%;
`;

const PostInput = styled.div`
  grid-area: content;
`;

const PostAutherName = styled.div`
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.7rem;
`;

const PostTextArea = styled.textarea`
  height: 5rem;
  padding-left: 5px;
  font-size: 1.25rem;
  resize: none;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const PostButtons = styled.div`
  grid-area: buttons;
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
`;

const PostButton = styled.button`
  border: 1px solid black;
  width: 5rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Preview = styled.div`
  position: relative;
`;

const PreviewImage = styled.img`
  height: 27rem;
`;

const PushImage = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 27rem;
  label {
    display: flex;
    flex-direction: column;
    font-size: 40px;
    width: auto;
    cursor: pointer;
    div {
      font-size: 20px;
      margin-top: 1rem;
    }
  }
  input {
    display: none;
  }
`;

const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 30px;
  width: 30px;
  top: 3px;
  left: 495px;
  border: none;
  background: none;
  color: red;
  font-size: 30px;
  cursor: pointer;
`;
