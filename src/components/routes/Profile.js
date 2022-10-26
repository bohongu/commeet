import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TbUserCircle } from 'react-icons/tb';
import { AiOutlineCamera } from 'react-icons/ai';
import { updateProfile } from 'firebase/auth';
import { auth, storage } from '../../Firebase';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { v4 } from 'uuid';

const Profile = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState('');
  const [newName, setNewName] = useState('');
  const [updateMode, setUpdateMode] = useState(false);
  const userInfo = useSelector((state) => state.user.userInfo);

  const onUpdateMode = () => {
    setUpdateMode(true);
  };
  const onCancel = () => {
    setUpdateMode(false);
  };
  const onChange = (event) => {
    setNewName(event.target.value);
  };
  const onUpdate = async () => {
    updateProfile(auth.currentUser, {
      displayName: newName,
    });
    navigate('/', { replace: true });
  };

  const showPhotoNav = () => {};

  const onImageChange = (event) => {
    const { files } = event.target;
    const image = files[0];
    const reader = new FileReader();
    reader.onloadend = (event) => {
      setFile(event.currentTarget.result);
    };
    reader.readAsDataURL(image);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let photoUrl = '';
    if (file !== '') {
      const storageRef = ref(storage, `profile/${v4()}`);
      await uploadString(storageRef, file, 'data_url');
      photoUrl = await getDownloadURL(ref(storage, storageRef));
    }
    await updateProfile(auth.currentUser, {
      photoURL: photoUrl,
    });
    setFile('');
    navigate('/', { replace: true });
  };

  const onFileClear = () => {
    setFile('');
  };

  const onDeleteImage = async () => {
    await updateProfile(auth.currentUser, {
      photoURL: null,
    });
    navigate('/', { replace: true });
  };
  return (
    <>
      <h1>개인정보 수정</h1>
      {userInfo.photoURL ? (
        <img src={userInfo.photoURL} height="80px" width="80px" alt="profile" />
      ) : (
        <TbUserCircle style={{ height: '80px', width: '80px' }} />
      )}
      <AiOutlineCamera
        style={{ height: '30px', width: '30px' }}
        onClick={showPhotoNav}
      />

      <div>
        <h2>기본정보</h2>
        <div>
          <span>이름</span>
          {updateMode ? (
            <input value={newName} onChange={onChange} />
          ) : (
            <span>{userInfo.displayName}</span>
          )}
          {updateMode ? (
            <>
              <button onClick={onUpdate}>확인</button>{' '}
              <button onClick={onCancel}>취소</button>
            </>
          ) : (
            <button onClick={onUpdateMode}>수정</button>
          )}
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <input type="file" accept="image/*" onChange={onImageChange} />
        {file && (
          <>
            <img src={file} width="100px" height="100px" alt="commeet-pic" />
            <button onClick={onFileClear}>❌</button>
          </>
        )}
        <button>프로필 바꾸기</button>
        <button onClick={onDeleteImage}>프로필 삭제</button>
      </form>
    </>
  );
};

export default Profile;
