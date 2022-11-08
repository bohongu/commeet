import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TbUserCircle } from 'react-icons/tb';
import { AiOutlineCamera } from 'react-icons/ai';
import { GrUpdate, GrClose } from 'react-icons/gr';
import { updateCurrentUser, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../../Firebase';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { v4 } from 'uuid';
import { userActions } from 'components/store/user';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import styled from 'styled-components';
import UpdateImageForm from 'components/layout/UpdateImageForm';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [myCommeets, setMyCommeets] = useState([]);
  const [file, setFile] = useState('');
  const [newName, setNewName] = useState('');
  const [updateMode, setUpdateMode] = useState(false);
  const [imageMode, setImageMode] = useState(false);
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    const q = query(
      collection(db, 'commeets'),
      where('authorId', '==', userInfo.uid),
      orderBy('createdAt', 'desc'),
    );
    onSnapshot(q, (querySnapshot) => {
      const updateCommeet = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMyCommeets(updateCommeet);
    });
  }, [userInfo.uid]);

  const refreshUser = async () => {
    await updateCurrentUser(auth, auth.currentUser);
    dispatch(userActions.setUserInfo(auth.currentUser));
  };

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
    refreshUser();
    navigate('/', { replace: true });
  };

  const showPhotoNav = () => {
    setImageMode(true);
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
    refreshUser();
    setFile('');
    navigate('/', { replace: true });
  };

  const onFileClear = () => {
    setFile('');
  };

  const onBack = () => {
    navigate(-1);
  };
  return (
    <>
      <Profilex>
        <ProfileWrapper>
          <ProfileLeft>
            <ProfileImageSection>
              {userInfo.photoURL ? (
                <ProfileImage src={userInfo.photoURL} />
              ) : (
                <TbUserCircle style={{ height: '10rem', width: '10rem' }} />
              )}
              <UpdateImage onClick={showPhotoNav}>
                <AiOutlineCamera />
              </UpdateImage>
            </ProfileImageSection>
            <ProfileInfo>
              <ProfileUserInfo>
                {updateMode ? (
                  <UpdateForm>
                    <UpdateInput onChange={onChange} />
                    <button>
                      <GrUpdate onClick={onUpdate} />
                    </button>
                    <button>
                      <GrClose onClick={onCancel} />
                    </button>
                  </UpdateForm>
                ) : (
                  <>
                    <ProfileUsername>{userInfo.displayName}</ProfileUsername>
                    <UpdateName onClick={onUpdateMode}>수정</UpdateName>
                  </>
                )}
              </ProfileUserInfo>
              <CommeetCount>Total Commeets : {myCommeets.length}</CommeetCount>
            </ProfileInfo>
          </ProfileLeft>
          <ProfileRight>
            {myCommeets.length !== 0 ? (
              myCommeets.map((commeet) => (
                <MyCommeetImage key={commeet.id} src={commeet.fileUrl} />
              ))
            ) : (
              <div>No Commeets</div>
            )}
          </ProfileRight>
        </ProfileWrapper>
      </Profilex>
      {imageMode && (
        <UpdateImageForm
          file={file}
          onBack={onBack}
          onSubmit={onSubmit}
          onFileClear={onFileClear}
          onImageChange={onImageChange}
        />
      )}
    </>
  );
};

export default Profile;

const Profilex = styled.div`
  margin: 6rem 0;
  height: calc(100vh - 12rem);
  overflow: auto;
  background: ${(props) => props.theme.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileWrapper = styled.section`
  width: 45rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  background: ${(props) => props.theme.pointBgColor};
  height: 40rem;
  gap: 10px;
`;

const ProfileLeft = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: ${(props) => props.theme.shadowColor};
`;

const ProfileImageSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 10rem;
  height: 10rem;
`;

const UpdateImage = styled.button`
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  bottom: 40px;
  right: 40px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProfileUserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`;
const UpdateForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  button {
    border: none;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 30px;
    background: ${(props) => props.theme.btnColor};
    cursor: pointer;
  }
`;

const UpdateInput = styled.input.attrs((props) => ({
  placeholder: 'New name',
}))`
  border: none;
  height: 30px;
  padding-left: 5px;
`;

const CommeetCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  font-size: 1.25rem;
`;

const ProfileUsername = styled.div`
  font-size: 1.125rem;
`;

const UpdateName = styled.button`
  border: 1px solid black;
  width: 60px;
  height: 30px;
  border-radius: 5px;
  border: none;
  background: ${(props) => props.theme.btnColor};
  cursor: pointer;
`;

const ProfileRight = styled.div`
  padding: 3px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  overflow-y: scroll;
  gap: 3px;
  box-shadow: ${(props) => props.theme.shadowColor};
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column-start: 2;
    grid-row-start: 2;
    grid-row-end: 4;
    color: ${(props) => props.theme.textColor};
  }
`;

const MyCommeetImage = styled.img`
  border-radius: 5px;
  height: 10rem;
`;
