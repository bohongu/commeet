import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom/dist';
import { db, storage } from '../../Firebase';
import { v4 } from 'uuid';
import Main from 'components/layout/Main';
import styled from 'styled-components';

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
  const onBack = () => {
    navigate(-1);
  };

  return (
    <Main>
      <PostWrapper>
        <PostHeader>
          <div onClick={onBack}>&larr;</div>
          <h1>NEW POST</h1>
          <div></div>
        </PostHeader>
        <PostForm onSubmit={onSubmit}>
          <PreviewWrapper>
            {file ? (
              <>
                <ImagePreview src={file} alt="commeet-pic" />
                <button onClick={onFileClear}>❌</button>
              </>
            ) : (
              <>
                <FileLabel>파일찾기</FileLabel>
                <PostFile
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                />
              </>
            )}
          </PreviewWrapper>
          <PostInput>
            <AuthorInfo>
              <AuthorPic src={userInfo.photoURL} />
              <AuthorName>{userInfo.displayName}</AuthorName>
            </AuthorInfo>
            <PostInfo>
              <label htmlFor="title">제목</label>
              <PostTitle
                name="title"
                id="title"
                value={title}
                onChange={onInputChnage}
              />
              <label htmlFor="commeet">본문</label>
              <PostDescription
                name="commeet"
                id="commeet"
                value={commeet}
                onChange={onInputChnage}
              />
            </PostInfo>
            <ButtonWrapper>
              <button>✔</button>
            </ButtonWrapper>
          </PostInput>
        </PostForm>
      </PostWrapper>
    </Main>
  );
};

export default CommeetForm;

const PostWrapper = styled.div`
  height: 700px;
  width: 1000px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  padding: 0 20px;
  border-bottom: 1px solid black;
  h1 {
    display: flex;
    justify-content: center;
  }
`;

const PostForm = styled.form`
  display: flex;
`;

const PreviewWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 650px;
  height: 650px;
  border-right: 1px solid black;
  button {
    position: absolute;
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 50%;
    bottom: 23px;
    right: 23px;
    cursor: pointer;
  }
`;

const ImagePreview = styled.img`
  width: 650px;
  height: 650px;
  border-right: 1px solid black;
`;

const PostInput = styled.div`
  width: 350px;
  margin-top: 20px;
`;

const AuthorInfo = styled.div`
  display: flex;
  padding: 0.75rem;
`;

const AuthorPic = styled.img`
  height: 50px;
  width: 50px;
  border: 1px solid black;
  border-radius: 50%;
  margin-right: 0%;
`;

const AuthorName = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 5%;
`;

const PostInfo = styled.div`
  padding: 0.75rem;
  border-bottom: 1px solid black;
  label {
    font-size: 1.125rem;
    font-weight: bold;
  }
`;

const PostTitle = styled.input.attrs((props) => ({ type: 'text' }))`
  margin: 1.125rem 0;
  height: 35px;
`;

const PostDescription = styled.input.attrs((props) => ({ type: 'textarea' }))`
  margin: 1.125rem 0;
  height: 250px;
`;

const PostFile = styled.input.attrs((props) => ({ type: 'file' }))`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;

const FileLabel = styled.label.attrs((props) => ({ htmlFor: 'image' }))`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  cursor: pointer;
  background: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  height: 40px;
  width: 130px;
  padding: 10px 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  height: 140px;
  align-items: center;
  justify-content: space-evenly;
  button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    background: ${(props) => props.theme.accentColor};
  }
`;
