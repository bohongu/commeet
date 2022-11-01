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

  const onDeleteImage = async () => {
    await updateProfile(auth.currentUser, {
      photoURL: null,
    });

    navigate('/', { replace: true });
  };
  return (
    <Profilex>
      <ProfileWrapper>
        <ProfileLeft>
          <ProfileImageSection>
            {userInfo.photoURL ? (
              <ProfileImage src={userInfo.photoURL} />
            ) : (
              <TbUserCircle style={{ height: '10rem', width: '10rem' }} />
            )}
            <UpdateImage>
              <AiOutlineCamera />
            </UpdateImage>
          </ProfileImageSection>
          <ProfileInfo>
            <ProfileUserInfo>
              {updateMode ? (
                <>
                  <UpdateInput onChange={onChange} />
                  <GrUpdate onClick={onUpdate} />
                  <GrClose onClick={onCancel} />
                </>
              ) : (
                <>
                  <ProfileUsername>{userInfo.displayName}</ProfileUsername>
                  <UpdateName onClick={onUpdateMode}>U</UpdateName>
                </>
              )}
            </ProfileUserInfo>
            <CommeetCount>Total Commeets : {myCommeets.length}</CommeetCount>
          </ProfileInfo>
        </ProfileLeft>
        <ProfileRight>
          {myCommeets &&
            myCommeets.map((commeet) => (
              <MyCommeetImage key={commeet.id} src={commeet.fileUrl} />
            ))}
        </ProfileRight>
      </ProfileWrapper>
    </Profilex>
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
  height: 40rem;
  gap: 10px;
`;

const ProfileLeft = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
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
  padding: 1rem;
`;

const ProfileUserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const UpdateInput = styled.input``;

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
  width: 30px;
  height: 30px;
`;

const ProfileRight = styled.div`
  padding: 3px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  overflow-y: scroll;
  gap: 3px;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
`;

const MyCommeetImage = styled.img`
  border-radius: 5px;
  height: 10rem;
`;
